'use client'

import { useCart } from '@/app/lib/contexts/CartContext';
import { CartItemCard } from './components/CartItemCard';
import { CartSummary } from './components/CartSummary';
import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { cart } = useCart();
  const hasItems = cart.items.length > 0;

  console.log("cart", cart);

  if (!hasItems) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6 px-4">
        <div className="bg-gray-100 p-6 rounded-full">
          <ShoppingCart className="w-12 h-12 text-gray-400" />
        </div>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven&apos;t added anything to your cart yet.</p>
          <Link 
            href="/products" 
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <CartItemCard key={item.id} item={item} />
          ))}
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <CartSummary cart={cart} />
        </div>
      </div>
    </div>
  );
}
