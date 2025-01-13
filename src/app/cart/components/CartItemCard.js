'use client'

import Image from 'next/image';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { useCart } from '@/app/lib/contexts/CartContext';

export function CartItemCard({ item }) {
  const { updateQuantity, removeFromCart, isLoading } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex gap-4">
        {/* Product Image */}
        <Link href={`/products/${item.id}`} className="shrink-0">
          <div className="relative w-24 h-24 rounded-lg overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="96px"
              className="object-cover"
            />
          </div>
        </Link>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <Link href={`/products/${item.id}`}>
            <h3 className="font-semibold text-lg text-gray-900 truncate hover:text-primary transition-colors">
              {item.name}
            </h3>
          </Link>
          <p className="text-primary font-medium mt-1">
            ₹{item.price.toLocaleString()}
          </p>

          {/* Quantity Controls */}
          <div className="flex items-center space-x-4 mt-3">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handleQuantityChange(item.quantity - 1)}
                disabled={isLoading}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                {item.quantity === 1 ? (
                  <Trash2 className="w-4 h-4 text-red-500" />
                ) : (
                  <span className="text-lg font-medium">-</span>
                )}
              </button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.quantity + 1)}
                disabled={isLoading}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
              >
                <span className="text-lg font-medium">+</span>
              </button>
            </div>

            <div className="text-sm text-gray-500">
              Subtotal: ₹{(item.price * item.quantity).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
