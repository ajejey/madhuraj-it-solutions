'use client';

import { useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-red-50 p-6 rounded-2xl">
      <AlertTriangle className="text-red-500 w-16 h-16 mb-4" />
      <h2 className="text-2xl font-bold text-red-700 mb-2">Product Edit Error</h2>
      <p className="text-red-600 mb-4 text-center">
        {error.message || 'An unexpected error occurred while loading the product.'}
      </p>
      <button 
        onClick={() => reset()}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
      >
        Try Again
      </button>
    </div>
  );
}
