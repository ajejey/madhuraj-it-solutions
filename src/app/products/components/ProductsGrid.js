'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { useSearchParams } from 'next/navigation';
import { fetchProducts } from '../actions';
import Link from 'next/link';
import Image from 'next/image';
import { AddToCartButton } from '@/components/AddToCartButton';
import { useCart } from '@/app/lib/contexts/CartContext';

// Custom fetcher that includes error handling
const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
};

export default function ProductsGrid({ initialProducts, currentPage }) {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(currentPage || 1);
  const [addTocartButtonColor, setAddToCartButtonColor] = useState('');
  const { addToCart, removeFromCart, updateQuantity, cart } = useCart();

  
  // Construct the query string for SWR key
  const queryString = searchParams.toString();
  
  // Use SWR for client-side data fetching
  const { data, error, isLoading } = useSWR(
    `/api/products?${queryString}`,
    fetcher,
    {
      fallbackData: initialProducts,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 5000, // Dedupe requests within 5 seconds
      keepPreviousData: true  // Keep showing previous data while loading new data
    }
  );

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Failed to load products. Please try again later.</p>
      </div>
    );
  }

  const products = data?.products || [];
  const totalPages = Math.ceil((data?.total || 0) / 12);

  console.log("products", products);

  const handleButtonClick = (product) => {
    console.log("product in handleButtonClick", product);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || '/placeholder-image.png',
    }, 1);
  };

  const cartProduct = (product) => {
    console.log("product in cartProduct", product);
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      images: product.images,
      stock: product.stock,
    };
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-600">No products found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div>
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group">
            <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <Link 
                href={`/products/${product.id}`}
                className="block"
              >
                <div className="aspect-square relative">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.condition === 'refurbished' && (
                    <span className="absolute top-2 right-2 bg-secondary/10 text-secondary text-xs px-2 py-1 rounded-full">
                      Refurbished
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 text-slate-800">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-primary font-bold">₹{product.price}</p>
                      {product.originalPrice && (
                        <p className="text-sm text-slate-500 line-through">
                          ₹{product.originalPrice}
                        </p>
                      )}
                    </div>
                    {product.stock === 0 && (
                      <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-600">
                        Out of Stock
                      </span>
                    )}
                  </div>
                </div>
              </Link>
              <div className="px-4 pb-4">
                <AddToCartButton 
                  product={cartProduct(product)}
                  disabled={product.stock === 0}
                  className="mt-2"
                />
                {/* <button onClick={()=>handleButtonClick(product)}> Test </button> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.set('page', pageNum.toString());
                window.history.pushState(null, '', `?${params.toString()}`);
                setPage(pageNum);
              }}
              className={`px-4 py-2 rounded-full ${
                pageNum === page
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
              }`}
            >
              {pageNum}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
