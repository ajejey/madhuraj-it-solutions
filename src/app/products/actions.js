'use server';
import { connectDB } from '@/app/lib/db';
// import Product from '@/models/Product';
import { getFileUrl } from '@/app/lib/storage';
import { Product } from '@/models/Product';

export async function fetchProducts({
  page = 1, 
  limit = 12, 
  category, 
  condition, 
  search,
  brand,
  minPrice,
  maxPrice,
  sortBy = 'createdAt',
  sortOrder = 'desc'
}) {
  await connectDB();

  const query = {};

  // Category filter
  if (category) query.category = category;

  // Brand filter
  if (brand) query.brand = brand;

  // Condition filter
  if (condition) query.condition = condition;

  // Price range filter
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = minPrice;
    if (maxPrice) query.price.$lte = maxPrice;
  }

  // Search filter
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { brand: { $regex: search, $options: 'i' } }
    ];
  }

  // Sorting
  const sortOptions = {};
  sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

  // Pagination
  const skip = (page - 1) * limit;

  try {
    // Fetch products with pagination
    const [products, total] = await Promise.all([
      Product.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .lean(),
      Product.countDocuments(query)
    ]);

    // Get total pages
    const totalPages = Math.ceil(total / limit);

    // Process products to include full image URLs
    const processedProducts = products.map(product => {
      return {
        ...product,
        id: product._id.toString(),
        _id: undefined,
        images: product.images.map(getFileUrl)
      };
    });

    return {
      products: processedProducts,
      currentPage: page,
      totalPages,
      total
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function fetchProductById(productId) {
  await connectDB();

  const product = await Product.findById(productId);
  
  if (!product) {
    throw new Error('Product not found');
  }

  const productObject = product.toObject();
  return {
    ...productObject,
    id: productObject._id.toString(),
    _id: undefined,
    images: productObject.images.map(getFileUrl)
  };
}

export async function getProductCategories() {
  await connectDB();

  const categories = await Product.distinct('category');
  // console.log("categories", categories);
  return categories;
}

export async function getProductBrands() {
  await connectDB();
  const brands = await Product.distinct('brand');
  return brands;
}
