'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/app/lib/contexts/CartContext';
import { LoginDialog } from './components/LoginDialog';
import { CheckoutForm } from './components/CheckoutForm';
import { OrderSummary } from './components/OrderSummary';
import { verifyAuth } from '@/app/lib/auth';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart } = useCart();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await verifyAuth();
        setIsAuthenticated(!!user);
      } catch (error) {
        console.error('Auth check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    // Redirect to cart if cart is empty
    if (!isLoading && cart.items.length === 0) {
      router.replace('/cart');
    }
  }, [cart.items.length, isLoading, router]);

  if (isLoading || cart.items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      {/* Login Dialog */}
      <LoginDialog 
        isOpen={!isAuthenticated} 
        onLoginSuccess={() => setIsAuthenticated(true)}
      />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Checkout Form */}
        <div className="lg:col-span-2">
          <CheckoutForm />
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <OrderSummary cart={cart} />
        </div>
      </div>
    </div>
  );
}
