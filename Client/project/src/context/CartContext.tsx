import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

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
  isSyncing: boolean;
  refreshCart: () => Promise<void>;
  addToCart: (item: Omit<CartItem, 'quantity' | 'size'>, size: string) => Promise<void>;
  removeFromCart: (id: number, size: string) => Promise<void>;
  updateQuantity: (id: number, size: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
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

const CART_SESSION_KEY = 'clothic_cart_session';
const CART_LOCAL_KEY = 'clothic_cart_items';
const CART_TABLE = 'cart_items';
type CartRow = {
  id: number;
  session_id: string;
  product_id: number;
  name: string;
  image: string;
  price: number;
  size: string;
  quantity: number;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [sessionId, setSessionId] = useState<string>('');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  useEffect(() => {
    const existingSession = localStorage.getItem(CART_SESSION_KEY);
    if (existingSession) {
      setSessionId(existingSession);
      return;
    }
    const newSession =
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    localStorage.setItem(CART_SESSION_KEY, newSession);
    setSessionId(newSession);
  }, []);

  const persistCartLocally = useCallback((items: CartItem[]) => {
    localStorage.setItem(CART_LOCAL_KEY, JSON.stringify(items));
  }, []);

  const mapRowToCartItem = (row: CartRow): CartItem => ({
    id: row.product_id,
    name: row.name,
    image: row.image,
    price: row.price,
    size: row.size,
    quantity: row.quantity,
  });

  const loadCartFromLocal = useCallback(() => {
    const stored = localStorage.getItem(CART_LOCAL_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as CartItem[];
        setCart(parsed);
      } catch (error) {
        console.error('Failed to parse cart from localStorage', error);
      }
    }
  }, []);

  const fetchCartFromSupabase = useCallback(async () => {
    if (!supabase || !sessionId) {
      loadCartFromLocal();
      return;
    }
    setIsSyncing(true);
    const { data, error } = await supabase
      .from(CART_TABLE)
      .select('*')
      .eq('session_id', sessionId)
      .order('id', { ascending: true });
    if (error) {
      console.error('Failed to load cart from Supabase', error.message);
      loadCartFromLocal();
    } else if (data) {
      const mapped = (data as CartRow[]).map(mapRowToCartItem);
      setCart(mapped);
      persistCartLocally(mapped);
    }
    setIsSyncing(false);
  }, [loadCartFromLocal, persistCartLocally, sessionId]);

  useEffect(() => {
    if (!sessionId) return;
    if (isSupabaseConfigured) {
      fetchCartFromSupabase();
    } else {
      loadCartFromLocal();
    }
  }, [fetchCartFromSupabase, loadCartFromLocal, sessionId]);

  const mutateCart = useCallback(
    (updater: (prev: CartItem[]) => CartItem[]) => {
      setCart(prev => {
        const updated = updater(prev);
        persistCartLocally(updated);
        return updated;
      });
    },
    [persistCartLocally]
  );

  const upsertRemoteCartItem = useCallback(
    async (item: CartItem) => {
      if (!supabase || !sessionId) return;
      const { error } = await supabase.from(CART_TABLE).upsert(
        {
          session_id: sessionId,
          product_id: item.id,
          name: item.name,
          image: item.image,
          price: item.price,
          size: item.size,
          quantity: item.quantity,
        },
        { onConflict: 'session_id,product_id,size' }
      );
      if (error) {
        console.error('Failed to sync cart item', error.message);
      }
    },
    [sessionId]
  );

  const deleteRemoteCartItem = useCallback(
    async (productId: number, size: string) => {
      if (!supabase || !sessionId) return;
      const { error } = await supabase
        .from(CART_TABLE)
        .delete()
        .eq('session_id', sessionId)
        .eq('product_id', productId)
        .eq('size', size);
      if (error) {
        console.error('Failed to delete cart item', error.message);
      }
    },
    [sessionId]
  );

  const addToCart = useCallback(
    async (item: Omit<CartItem, 'quantity' | 'size'>, size: string) => {
      mutateCart(prev => {
        const existingItem = prev.find(p => p.id === item.id && p.size === size);
        if (existingItem) {
          const updated = prev.map(p =>
            p.id === item.id && p.size === size
              ? { ...p, quantity: p.quantity + 1 }
              : p
          );
          const changed = updated.find(p => p.id === item.id && p.size === size);
          if (changed) {
            void upsertRemoteCartItem(changed);
          }
          return updated;
        }
        const newItem = { ...item, size, quantity: 1 };
        void upsertRemoteCartItem(newItem);
        return [...prev, newItem];
      });
    },
    [mutateCart, upsertRemoteCartItem]
  );

  const removeFromCart = useCallback(
    async (id: number, size: string) => {
      mutateCart(prev => prev.filter(p => !(p.id === id && p.size === size)));
      void deleteRemoteCartItem(id, size);
    },
    [deleteRemoteCartItem, mutateCart]
  );

  const updateQuantity = useCallback(
    async (id: number, size: string, quantity: number) => {
      if (quantity <= 0) {
        await removeFromCart(id, size);
        return;
      }
      let updatedItem: CartItem | null = null;
      mutateCart(prev =>
        prev.map(p => {
          if (p.id === id && p.size === size) {
            updatedItem = { ...p, quantity };
            return updatedItem;
          }
          return p;
        })
      );
      if (updatedItem) {
        void upsertRemoteCartItem(updatedItem);
      }
    },
    [mutateCart, removeFromCart, upsertRemoteCartItem]
  );

  const clearCart = useCallback(async () => {
    mutateCart(() => []);
    if (supabase && sessionId) {
      const { error } = await supabase
        .from(CART_TABLE)
        .delete()
        .eq('session_id', sessionId);
      if (error) {
        console.error('Failed to clear remote cart', error.message);
      }
    }
  }, [mutateCart, sessionId]);

  const getTotalPrice = useCallback(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const getTotalItems = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const contextValue = useMemo<CartContextType>(
    () => ({
      cart,
      isSyncing,
      refreshCart: fetchCartFromSupabase,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems,
    }),
    [
      addToCart,
      cart,
      clearCart,
      fetchCartFromSupabase,
      getTotalItems,
      getTotalPrice,
      isSyncing,
      removeFromCart,
      updateQuantity,
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

