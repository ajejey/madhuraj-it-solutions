import React from 'react';
import { Loader2 } from 'lucide-react';

export default function AdminLoading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="text-center">
        <Loader2 
          className="mx-auto mb-4 animate-spin text-primary" 
          size={48} 
        />
        <p className="text-xl text-gray-600">
          Loading Admin Dashboard...
        </p>
      </div>
    </div>
  );
}