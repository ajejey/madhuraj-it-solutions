'use client'

import { useState } from 'react';
import { ShoppingCart, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/app/lib/contexts/CartContext';

export function AddToCartButton({ 
  product, 
  disabled = false, 
  className = ''
}) {
  const { addToCart, removeFromCart, updateQuantity, isLoading, cart } = useCart();

  console.log("product in AddToCartButton", product);
  
  // Check if product is already in cart
  const cartItem = cart.items.find(item => item.id === product.id);
  const currentQuantity = cartItem?.quantity || 0;
  const isInCart = currentQuantity > 0;


  const handleInitialAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0] || '/placeholder-image.png',
    }, 1);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(product.id);
    } else if (newQuantity <= product.stock) {
      updateQuantity(product.id, newQuantity);
    }
  };

  if (!isInCart) {
    return (
      <button 
        type="button"
        onClick={handleInitialAdd}
        disabled={disabled || isLoading || product.stock === 0}
        className={`
          w-full flex items-center justify-center space-x-2 
          bg-primary text-white 
          px-4 py-2 rounded-full 
          hover:bg-primary-dark 
          transition-colors 
          disabled:opacity-50 
          disabled:cursor-not-allowed
          ${className}
        `}
      >
        <ShoppingCart className="w-5 h-5" />
        <span>Add to Cart</span>
      </button>
    );
  }

  return (
    <div className="flex items-center justify-between w-full bg-white border border-primary rounded-full p-1">
      <button 
        type="button"
        onClick={() => handleQuantityChange(currentQuantity - 1)}
        className="w-8 h-8 flex items-center justify-center text-primary hover:bg-primary/10 rounded-full transition-colors"
        disabled={isLoading}
      >
        {currentQuantity === 1 ? <Trash2 className="w-4 h-4" /> : <Minus className="w-4 h-4" />}
      </button>
      
      <span className="text-primary font-medium">{currentQuantity}</span>
      
      <button 
        type="button"
        onClick={() => handleQuantityChange(currentQuantity + 1)}
        className="w-8 h-8 flex items-center justify-center text-primary hover:bg-primary/10 rounded-full transition-colors"
        disabled={isLoading || currentQuantity >= product.stock}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
