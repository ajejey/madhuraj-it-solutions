'use client'

import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';

export function CartSummary({ cart }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({cart.totalItems} items)</span>
          <span>₹{cart.totalAmount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Delivery</span>
          <span className="text-green-600">Free</span>
        </div>
        <div className="border-t pt-3">
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-primary">₹{cart.totalAmount.toLocaleString()}</span>
          </div>
          <p className="text-gray-500 text-sm mt-1">Including GST</p>
        </div>
      </div>

      <Link
        href="/checkout"
        className="w-full flex items-center justify-center space-x-2 bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors"
      >
        <ShoppingBag className="w-5 h-5" />
        <span>Proceed to Checkout</span>
      </Link>

      <div className="mt-4 text-center">
        <Link 
          href="/products" 
          className="text-primary hover:text-primary-dark text-sm"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
