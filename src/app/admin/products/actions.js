'use server'

import { Product } from '@/models/Product';
// import { requireRole } from '@/lib/auth';
// import { uploadFile } from '@/lib/storage';
import { revalidatePath } from 'next/cache';
import { connectDB } from '@/app/lib/db';
import { uploadFile } from '@/app/lib/storage';
import { requireRole } from '@/app/lib/auth';
import { deleteFile } from '@/app/lib/storage';

export async function fetchProducts({
  page = 1, 
  limit = 10, 
  category, 
  condition, 
  search
}) {
  await connectDB();
  await requireRole(['admin']);

  const query = {};
  if (category) query.category = category;
  if (condition) query.condition = condition;
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } }
    ];
  }

  const totalProducts = await Product.countDocuments(query);
  const totalPages = Math.ceil(totalProducts / limit);

  const products = await Product.find(query)
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .select('name price condition stock images createdAt');

  // Serialize products
  const serializedProducts = products.map(product => {
    const productObject = product.toObject();
    return {
      ...productObject,
      id: productObject._id.toString(),
      _id: undefined
    };
  });

  return {
    products: serializedProducts,
    totalPages,
    currentPage: page
  };
}

export async function fetchProductById(productId) {
  await connectDB();
  await requireRole(['admin']);

  const product = await Product.findById(productId);
  
  if (!product) {
    throw new Error('Product not found');
  }

  return JSON.parse(JSON.stringify({
    ...product.toObject(),
    id: product._id.toString(),
    _id: undefined
  }));
}

export async function createProduct(formData) {
  await connectDB();
  await requireRole(['admin']);

  try {
    // Parallel image uploads
    const imagePromises = formData.getAll('images').map(async (image) => {
      return await uploadFile(image);
    });

    const imageUrls = await Promise.all(imagePromises);

    const productData = {
      name: formData.get('name'),
      description: formData.get('description'),
      price: parseFloat(formData.get('price')),
      condition: formData.get('condition'),
      category: formData.get('category'),
      stock: parseInt(formData.get('stock')),
      images: imageUrls,
      specifications: JSON.parse(formData.get('specifications') || '{}'),
      tags: formData.get('tags')?.split(',') || []
    };

    const product = new Product(productData);
    await product.save();

    revalidatePath('/admin/products');

    return { 
      success: true, 
      message: 'Product created successfully',
      productId: product._id 
    };
  } catch (error) {
    console.error('Product creation error:', error);
    return { 
      success: false, 
      message: error.message 
    };
  }
}

export async function updateProduct(productId, productData) {
  await connectDB();
  await requireRole(['admin']);

  try {
    // Handle image uploads
    const uploadedImages = [];
    if (productData.images && productData.images.length > 0) {
      for (const image of productData.images) {
        if (typeof image === 'object' && image instanceof File) {
          const uploadedImageId = await uploadFile(image);
          uploadedImages.push(uploadedImageId);
        } else {
          uploadedImages.push(image);
        }
      }
    }

    // Update product data
    const updatedProduct = await Product.findByIdAndUpdate(
      productId, 
      { 
        ...productData, 
        images: uploadedImages 
      }, 
      { new: true }
    );

    if (!updatedProduct) {
      return { 
        success: false, 
        message: 'Product not found' 
      };
    }

    return { 
      success: true, 
      message: 'Product updated successfully',
      product: JSON.parse(JSON.stringify(updatedProduct))
    };
  } catch (error) {
    console.error('Product update error:', error);
    return { 
      success: false, 
      message: error.message || 'Failed to update product' 
    };
  }
}

export async function deleteProduct(productId) {
  await connectDB();
  await requireRole(['admin']);

  try {
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return { 
        success: false, 
        message: 'Product not found' 
      };
    }

    // Delete associated images
    if (product.images && product.images.length > 0) {
      for (const imageId of product.images) {
        await deleteFile(imageId);
      }
    }

    return { 
      success: true, 
      message: 'Product deleted successfully' 
    };
  } catch (error) {
    console.error('Product deletion error:', error);
    return { 
      success: false, 
      message: error.message || 'Failed to delete product' 
    };
  }
}
