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
  minPrice,
  maxPrice,
  sortBy = 'createdAt',
  sortOrder = 'desc'
}) {
  await connectDB();

  const query = {};

  // Category filter
  if (category) query.category = category;

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

  // Fetch products
  const products = await Product.find(query)
    .sort(sortOptions)
    .skip(skip)
    .limit(limit)
    .select('name price originalPrice condition images brand stock');

  // Total products count for pagination
  const totalProducts = await Product.countDocuments(query);

  // Process products to include full image URLs
  const processedProducts = products.map(product => {
    const productObject = product.toObject();
    return {
      ...productObject,
      id: productObject._id.toString(),
      _id: undefined,
      images: productObject.images.map(getFileUrl)
    };
  });

  return {
    products: processedProducts,
    totalPages: Math.ceil(totalProducts / limit),
    currentPage: page,
    totalProducts
  };
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
  return categories.toObject();
}
