'use client';

import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';

export function OrderSummary({ cart }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm space-y-6 sticky top-24">
      <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
      
      {/* Cart Items */}
      <div className="space-y-4">
        {cart.items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              <p className="text-sm font-medium text-primary">
                ₹{(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Price Breakdown */}
      <div className="border-t pt-4 space-y-3">
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

      {/* Order Info */}
      <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-600">
        <div className="flex items-start gap-3">
          <ShoppingBag className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <p className="font-medium text-gray-900">Delivery Information</p>
            <p className="mt-1">Orders usually ship within 1-2 business days</p>
          </div>
        </div>
      </div>
    </div>
  );
}
