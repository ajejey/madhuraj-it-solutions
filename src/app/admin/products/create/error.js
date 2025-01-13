'use client';

import { AlertTriangle } from 'lucide-react';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
      <div className="text-center bg-red-50 p-8 rounded-2xl shadow-md">
        <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-red-500" />
        <h2 className="text-xl font-bold text-red-700 mb-2">
          Product Creation Failed
        </h2>
        <p className="text-red-600 mb-4">
          {error.message || 'An unexpected error occurred'}
        </p>
        <button
          onClick={() => reset()}
          className="bg-primary text-white px-4 py-2 rounded-full hover:bg-primary-dark transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
