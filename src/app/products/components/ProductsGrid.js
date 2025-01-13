'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchProducts } from '../actions';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AddToCartButton } from '@/components/AddToCartButton';

export default function ProductsGrid() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const { products, totalPages } = await fetchProducts({ page });
        setProducts(products);
        setTotalPages(totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [page]);

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Error loading products: {error}
      </div>
    );
  }

  

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="group">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
            <Link 
            key={product.id} 
            href={`/products/${product.id}`} 
            className="group"
          >
              <div className="relative w-full aspect-square">
                <Image 
                  src={product.images[0] || '/placeholder-image.png'}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                {product.condition === 'refurbished' && (
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs">
                    Refurbished
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg truncate">{product.name}</h3>
                <div className="flex items-center justify-between mt-2">
                  <div>
                    <p className="text-primary font-semibold">
                      ₹{product.price.toLocaleString()}
                    </p>
                    {product.originalPrice && (
                      <p className="text-gray-500 line-through text-sm">
                        ₹{product.originalPrice.toLocaleString()}
                      </p>
                    )}
                  </div>
                  {product.stock === 0 && (
                    <span className="text-red-500 text-xs">Out of Stock</span>
                  )}
                </div>
                </div>
              </Link>
                {product.stock > 0 && (
                  <div className="mt-2">
                    <AddToCartButton 
                      product={product}
                      disabled={product.stock === 0}
                      className="w-full"
                    />
                  </div>
                )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-4 mt-8">
        <button 
          onClick={handlePrevPage} 
          disabled={page === 1}
          className="bg-primary text-white p-2 rounded-full disabled:opacity-50"
        >
          <ChevronLeft />
        </button>
        <span>Page {page} of {totalPages}</span>
        <button 
          onClick={handleNextPage} 
          disabled={page === totalPages}
          className="bg-primary text-white p-2 rounded-full disabled:opacity-50"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
