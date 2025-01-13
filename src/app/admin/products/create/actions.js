'use server'

import { revalidatePath } from 'next/cache';
import { connectDB } from '@/app/lib/db';
import { Product } from '@/models/Product';
import { uploadFile } from '@/app/lib/storage';
import { requireRole } from '@/app/lib/auth';

export async function createProduct(formData) {
  console.log("connecting to db");
  await connectDB();
  await requireRole(['admin']);

  console.log("formData in action", formData);

  try {
    // Parallel image uploads
    const imageUploads = formData.images.map(async (image) => {
      return await uploadFile(image);
    });

    console.log("imageUploads", imageUploads);

    const imageIds = await Promise.all(imageUploads);

    console.log("imageIds", imageIds);

    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
      condition: formData.condition,
      category: formData.category,
      subCategory: formData.subCategory || null,
      stock: parseInt(formData.stock),
      images: imageIds,
      specifications: formData.specifications || {},
      tags: formData.tags || [],
      brand: formData.brand
    };

    console.log("productData", productData);

    const newProduct = await Product.create(productData);

    console.log("newProduct", newProduct);

    // Use JSON parse/stringify to convert to a plain object
    const serializedProduct = JSON.parse(JSON.stringify(newProduct));

    // Ensure id is a string
    serializedProduct.id = serializedProduct._id;
    delete serializedProduct._id;

    // Revalidate the products page to reflect the new product
    revalidatePath('/admin/products');

    console.log("Product created successfully");

    return {
      success: true,
      product: serializedProduct,
      message: 'Product created successfully'
    };
  } catch (error) {
    console.error('Product creation error:', error);
    return {
      success: false,
      message: error.message || 'Failed to create product'
    };
  }
}
