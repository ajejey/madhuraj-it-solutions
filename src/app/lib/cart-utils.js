import { v4 as uuidv4 } from 'uuid';

export function getGuestCartToken() {
  // Check if running on client side
  if (typeof window === 'undefined') return null;

  let guestToken = localStorage.getItem('guest_cart_token');
  
  if (!guestToken) {
    guestToken = uuidv4();
    localStorage.setItem('guest_cart_token', guestToken);
  }
  
  return guestToken;
}

export function clearGuestCartToken() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('guest_cart_token');
  }
}

export function saveGuestCartItems(items) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('guest_cart_items', JSON.stringify(items));
  }
}

export function getGuestCartItems() {
  if (typeof window === 'undefined') return [];

  const items = localStorage.getItem('guest_cart_items');
  return items ? JSON.parse(items) : [];
}

export function clearGuestCartItems() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('guest_cart_items');
  }
}
