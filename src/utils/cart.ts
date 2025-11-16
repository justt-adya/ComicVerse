import { Comic } from "@/data/comics";

export interface CartItem {
  comic: Comic;
  quantity: number;
}

const CART_STORAGE_KEY = "comicverse_cart";

export const getCart = (): CartItem[] => {
  const cartData = localStorage.getItem(CART_STORAGE_KEY);
  if (!cartData) return [];
  
  try {
    return JSON.parse(cartData);
  } catch {
    return [];
  }
};

export const saveCart = (cart: CartItem[]): void => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
};

export const addToCart = (comic: Comic): void => {
  const cart = getCart();
  const existingItem = cart.find(item => item.comic.id === comic.id);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ comic, quantity: 1 });
  }
  
  saveCart(cart);
  
  // Dispatch custom event for cart updates
  window.dispatchEvent(new CustomEvent("cartUpdated"));
};

export const removeFromCart = (comicId: string): void => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.comic.id !== comicId);
  saveCart(updatedCart);
  window.dispatchEvent(new CustomEvent("cartUpdated"));
};

export const updateQuantity = (comicId: string, quantity: number): void => {
  const cart = getCart();
  const item = cart.find(item => item.comic.id === comicId);
  
  if (item) {
    if (quantity <= 0) {
      removeFromCart(comicId);
    } else {
      item.quantity = quantity;
      saveCart(cart);
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    }
  }
};

export const clearCart = (): void => {
  localStorage.removeItem(CART_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent("cartUpdated"));
};

export const getCartTotal = (): number => {
  const cart = getCart();
  return cart.reduce((total, item) => total + (item.comic.price * item.quantity), 0);
};

export const getCartItemCount = (): number => {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
};
