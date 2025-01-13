'use client';

import { AlertCircle } from 'lucide-react';
import { useEffect } from 'react';

export default function LoginError({
  error,
  reset,
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="text-center bg-white p-8 rounded-2xl shadow-xl">
        <AlertCircle 
          className="mx-auto mb-4 text-red-500" 
          size={48} 
        />
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Login Error
        </h2>
        <p className="text-gray-600 mb-6">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button 
          onClick={() => reset()}
          className="px-4 py-2 bg-primary text-white rounded-full hover:bg-primary-dark transition"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
