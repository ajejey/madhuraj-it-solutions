'use client'

import { 
  createContext, 
  useState, 
  useContext, 
  useEffect 
} from 'react';
import { toast } from 'sonner';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState({ items: [], totalItems: 0, totalAmount: 0 });
  const [isLoading, setIsLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const calculateTotals = (items) => {
    return {
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
      totalAmount: items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };
  };

  const handleAddToCart = (product, quantity = 1) => {
    setIsLoading(true);
    try {
      setCart(prevCart => {
        const existingItemIndex = prevCart.items.findIndex(item => item.id === product.id);
        let newItems;

        if (existingItemIndex > -1) {
          // Update quantity if item exists
          newItems = prevCart.items.map((item, index) => 
            index === existingItemIndex 
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          // Add new item
          newItems = [...prevCart.items, { 
            id: product.id,
            name: product.name,
            price: product.price,
            quantity,
            image: product.image
          }];
        }

        const totals = calculateTotals(newItems);
        
        return {
          items: newItems,
          ...totals
        };
      });
      
      toast.success('Item added to cart');
    } catch (error) {
      toast.error('Failed to add item to cart');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFromCart = (productId) => {
    setIsLoading(true);
    try {
      setCart(prevCart => {
        const newItems = prevCart.items.filter(item => item.id !== productId);
        const totals = calculateTotals(newItems);
        
        return {
          items: newItems,
          ...totals
        };
      });
      
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item from cart');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    
    setIsLoading(true);
    try {
      setCart(prevCart => {
        const newItems = prevCart.items.map(item =>
          item.id === productId ? { ...item, quantity } : item
        );
        const totals = calculateTotals(newItems);
        
        return {
          items: newItems,
          ...totals
        };
      });
      
      toast.success('Cart updated');
    } catch (error) {
      toast.error('Failed to update cart');
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = () => {
    setIsLoading(true);
    try {
      setCart({ items: [], totalItems: 0, totalAmount: 0 });
      localStorage.removeItem('cart');
      toast.success('Cart cleared');
    } catch (error) {
      toast.error('Failed to clear cart');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      isLoading,
      addToCart: handleAddToCart,
      removeFromCart: handleRemoveFromCart,
      updateQuantity: handleUpdateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
