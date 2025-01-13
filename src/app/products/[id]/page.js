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
    <div className="container mx-auto px-4 py-20">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-lg">
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
                <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">
                  Refurbished
                </div>
              )}
              {discountPercentage > 0 && (
                <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                  {discountPercentage}% OFF
                </div>
              )}
            </div>
          </div>

          {/* Additional Images */}
          {product.images.length > 1 && (
            <div className="flex space-x-4">
              {product.images.slice(1, 4).map((image, index) => (
                <div 
                  key={index} 
                  className="relative w-24 h-24 rounded-lg overflow-hidden"
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

        {/* Product Details */}
        <div className="space-y-6">
          {/* Product Header */}
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">{product.name}</h1>
            <p className="text-slate-600">{product.description}</p>
          </div>

          {/* Pricing and Ratings */}
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <p className="text-3xl font-bold text-primary">
                ₹{product.price.toLocaleString()}
              </p>
              {product.originalPrice && (
                <p className="text-slate-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </p>
              )}
            </div>
            
            {/* Product Metadata */}
            <div className="flex items-center space-x-4 text-sm text-slate-600">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>
                  {product.ratings.average.toFixed(1)} 
                  <span className="text-xs ml-1">
                    ({product.ratings.count} reviews)
                  </span>
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Box className="w-4 h-4" />
                <span>
                  {product.category} 
                  {product.subCategory && ` - ${product.subCategory}`}
                </span>
              </div>
            </div>

            {/* Stock and Condition */}
            <div className="flex items-center space-x-4">
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

          {/* Add to Cart and Stock Information */}
          <div className="flex items-center space-x-4 mt-4">
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
            <div className="text-sm text-slate-600">
              <Box className="inline-block mr-2 text-primary" size={20} />
              {product.stock} items available
            </div>
          </div>

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Specifications</h2>
              <div className="bg-gray-50 p-4 rounded-lg grid md:grid-cols-2 gap-3">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b pb-2 last:border-b-0">
                    <span className="text-slate-600 capitalize font-medium">{key}</span>
                    <span className="text-slate-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {product.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="bg-gray-100 text-slate-700 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
