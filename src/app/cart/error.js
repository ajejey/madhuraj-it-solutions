'use client'

import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function CartError({ error, reset }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 px-4">
      <div className="bg-red-100 p-6 rounded-full">
        <AlertCircle className="w-12 h-12 text-red-500" />
      </div>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h2>
        <p className="text-gray-600 mb-6">{error.message || 'There was an error loading your cart.'}</p>
        <div className="space-x-4">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
          >
            Try Again
          </button>
          <Link 
            href="/products" 
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
