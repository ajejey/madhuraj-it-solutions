'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
          <h3 className="text-red-800 font-medium">Error Loading Orders</h3>
        </div>
        <p className="text-red-700 mt-2">{error.message}</p>
        <button
          onClick={reset}
          className="mt-4 px-4 py-2 bg-red-100 text-red-800 rounded-full hover:bg-red-200 transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
