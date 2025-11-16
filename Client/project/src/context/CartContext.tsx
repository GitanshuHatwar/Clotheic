import { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity' | 'size'>, size: string) => void;
  removeFromCart: (id: number, size: string) => void;
  updateQuantity: (id: number, size: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity' | 'size'>, size: string) => {
    setCart(prev => {
      const existingItem = prev.find(p => p.id === item.id && p.size === size);
      if (existingItem) {
        return prev.map(p =>
          p.id === item.id && p.size === size
            ? { ...p, quantity: p.quantity + 1 }
            : p
        );
      }
      return [...prev, { ...item, size, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number, size: string) => {
    setCart(prev => prev.filter(p => !(p.id === id && p.size === size)));
  };

  const updateQuantity = (id: number, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }
    setCart(prev =>
      prev.map(p =>
        p.id === id && p.size === size ? { ...p, quantity } : p
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

