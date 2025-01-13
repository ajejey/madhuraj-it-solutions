'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import LoginForm from './CheckoutLoginForm';

export function LoginDialog({ isOpen, onLoginSuccess }) {
  const router = useRouter();

  // Handle escape key - now redirects to cart
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') router.push('/cart');
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, router]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 transition-opacity"
      />

      {/* Dialog */}
      <div 
        role="dialog"
        aria-modal="true"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div 
          className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-sm relative animate-in fade-in zoom-in duration-200"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">
              Sign In or Create Account
            </h2>
            <button
              onClick={() => router.push('/cart')}
              className="p-1 rounded-full hover:bg-gray-100 transition-colors flex items-center text-sm text-gray-600"
              aria-label="Back to cart"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Cart
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            Enter your email to receive a verification code
          </p>

          <LoginForm onSuccess={onLoginSuccess} />
        </div>
      </div>
    </>
  );
}
