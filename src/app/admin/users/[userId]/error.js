'use client';

import { AlertTriangle } from 'lucide-react';

export default function UserDetailsError({ error, reset }) {
  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[calc(100vh-200px)]">
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center max-w-md">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="h-16 w-16 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          User Details Error
        </h2>
        <p className="text-gray-600 mb-6">
          {error.message || 'An unexpected error occurred while loading user details.'}
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => reset()}
            className="px-6 py-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}
