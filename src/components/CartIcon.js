'use client'

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/app/lib/contexts/CartContext';

export function CartIcon() {
  const { cart, isLoading } = useCart();

  console.log("cart", cart);


  return (
    <Link 
      href="/cart" 
      className="relative group flex items-center"
      aria-label="View Cart"
    >
      <div className="relative">
        <ShoppingCart 
          className="w-6 h-6 text-gray-700 group-hover:text-primary transition-colors" 
        />
        {cart.totalItems > 0 && (
          <span 
            className="absolute -top-2 -right-2 
            bg-primary text-white rounded-full 
            w-5 h-5 flex items-center justify-center 
            text-xs font-bold
            animate-bounce"
          >
            {cart.totalItems}
          </span>
        )}
      </div>
      {isLoading && (
        <div 
          className="absolute -top-1 -right-1 
          w-3 h-3 bg-primary rounded-full 
          animate-ping"
        />
      )}
    </Link>
  );
}
