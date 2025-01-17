'use client';

import { useEffect } from 'react';
import { AlertCircle, LogIn } from 'lucide-react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  // Check if it's an authentication error
  const isAuthError = error.message.toLowerCase().includes('authentication') || 
                      error.message.toLowerCase().includes('login');

  return (
    <div className="container h-screen mx-auto px-4 py-20 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        {isAuthError ? (
          <>
            <div className="flex justify-center mb-6">
              <LogIn className="h-16 w-16 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">Login Required</h3>
            <p className="text-muted-foreground mb-6">
              You need to be logged in to view your orders. Please sign in to continue.
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                href="/login" 
                className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors flex items-center space-x-2"
              >
                <LogIn className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
              <Link 
                href="/" 
                className="border border-primary text-primary px-6 py-3 rounded-full hover:bg-primary-light hover:text-white transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-center mb-6">
              <AlertCircle className="h-16 w-16 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-red-600 mb-4">Oops! Something Went Wrong</h3>
            <p className="text-muted-foreground mb-6">{error.message}</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={reset}
                className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors"
              >
                Try Again
              </button>
              <Link 
                href="/" 
                className="border border-primary text-primary px-6 py-3 rounded-full hover:bg-primary-light hover:text-white transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
