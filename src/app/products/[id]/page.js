import Image from 'next/image';
import { Star, ShoppingCart, Tag, Box, CheckCircle } from 'lucide-react';
import { fetchProductById } from '../actions';
import { getFileUrl } from '@/app/lib/storage';
import { AddToCartButton } from '@/components/AddToCartButton';

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const product = await fetchProductById(id);
    return {
      title: `${product.name} - Madhuraj System Solutions`,
      description: product.description
    };
  } catch (error) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found'
    };
  }
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await fetchProductById(id);

  // console.log("product", product);

  // Calculate discount percentage
  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="container mx-auto px-2 py-20 md:py-12">
      {/* Main Product Section */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Left Column - Images */}
          <div className="bg-gray-50 p-6 lg:p-8">
            {/* Main Image */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg mb-4">
              <Image 
                src={product.images[0] || '/placeholder-image.png'}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
              {/* Condition and Discount Badges */}
              <div className="absolute top-4 right-4 flex space-x-2">
                {product.condition === 'refurbished' && (
                  <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Refurbished
                  </div>
                )}
                {discountPercentage > 0 && (
                  <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {discountPercentage}% OFF
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.slice(1, 5).map((image, index) => (
                  <div 
                    key={index} 
                    className="relative aspect-square rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
                  >
                    <Image 
                      src={image}
                      alt={`${product.name} - Image ${index + 2}`}
                      fill
                      sizes="(max-width: 768px) 25vw, 10vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Details */}
          <div className="p-6 lg:p-8 flex flex-col">
            {/* Product Header */}
            <div className="mb-6">
              <div className="flex items-center space-x-4 text-sm text-slate-600 mb-2">
                <div className="flex items-center space-x-1">
                  <Box className="w-4 h-4" />
                  <span>
                    {product.category} 
                    {product.subCategory && ` - ${product.subCategory}`}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>
                    {product?.ratings?.average?.toFixed(1)} 
                    <span className="text-xs ml-1">
                      ({product?.ratings?.count} reviews)
                    </span>
                  </span>
                </div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary mb-3">{product.name}</h1>
              <p className="text-slate-600">{product.description}</p>
            </div>

            {/* Pricing Section */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex items-center space-x-4 mb-2">
                <p className="text-3xl font-bold text-primary">
                  ₹{product.price.toLocaleString()}
                </p>
                {product.originalPrice && (
                  <p className="text-slate-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </p>
                )}
              </div>
              
              {/* Stock and Condition */}
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle 
                    className={`w-5 h-5 ${
                      product.stock > 0 ? 'text-green-600' : 'text-red-600'
                    }`} 
                  />
                  <span>
                    {product.stock > 0 
                      ? `In Stock (${product.stock} available)` 
                      : 'Out of Stock'}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Tag className="w-4 h-4" />
                  <span className="capitalize">{product.condition}</span>
                </div>
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="flex items-center space-x-4 mb-8">
              {product.stock > 0 ? (
                <div className="flex-grow">
                  <AddToCartButton 
                    product={product}
                    disabled={product.stock === 0}
                    className="w-full"
                  />
                </div>
              ) : (
                <div className="text-red-500 font-semibold">
                  Out of Stock
                </div>
              )}
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-3 text-primary">Product Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="bg-gray-100 text-slate-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Specifications Section - Full Width */}
        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div className="border-t border-gray-100">
            <div className="p-6 lg:p-8">
              <h2 className="text-2xl font-semibold mb-6 text-primary">Product Specifications</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <div 
                    key={key}
                    className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        <span className="text-slate-700 capitalize font-medium">{key}</span>
                      </div>
                      <span className="text-slate-600 break-words">
                        {typeof value === 'boolean' 
                          ? (value ? 'Yes' : 'No')
                          : value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
