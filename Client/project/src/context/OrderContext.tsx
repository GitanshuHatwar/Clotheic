import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { CartItem } from './CartContext';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

type OrderRow = {
  id: string;
  items: CartItem[] | null;
  total: number;
  address: string;
  pincode: string;
  payment_method: string | null;
  status: Order['status'] | null;
  order_date: string | null;
};

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  address: string;
  pincode: string;
  paymentMethod: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  orderDate: string;
}

interface OrderContextType {
  orders: Order[];
  isSyncing: boolean;
  refreshOrders: () => Promise<void>;
  placeOrder: (order: Omit<Order, 'id' | 'orderDate' | 'status'>) => Promise<string>;
  getOrderById: (id: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const persistOrdersLocally = (nextOrders: Order[]) => {
    localStorage.setItem('clothic_orders', JSON.stringify(nextOrders));
  };

  const loadOrdersFromLocalStorage = () => {
    const stored = localStorage.getItem('clothic_orders');
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Order[];
        setOrders(parsed);
      } catch (error) {
        console.error('Failed to parse stored orders', error);
      }
    }
  };

  const fetchOrdersFromSupabase = useCallback(async () => {
    if (!supabase) {
      loadOrdersFromLocalStorage();
      return;
    }
    setIsSyncing(true);
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('order_date', { ascending: false });
    if (error) {
      console.error('Failed to load orders from Supabase', error.message);
      loadOrdersFromLocalStorage();
    } else if (data) {
      const mapped: Order[] = (data as OrderRow[]).map((row) => ({
        id: row.id,
        items: row.items ?? [],
        total: row.total,
        address: row.address,
        pincode: row.pincode,
        paymentMethod: row.payment_method ?? 'Cash on Delivery',
        status: row.status ?? 'confirmed',
        orderDate: row.order_date ?? new Date().toISOString(),
      }));
      setOrders(mapped);
      persistOrdersLocally(mapped);
    }
    setIsSyncing(false);
  }, []);

  useEffect(() => {
    if (isSupabaseConfigured) {
      fetchOrdersFromSupabase();
    } else {
      loadOrdersFromLocalStorage();
    }
  }, [fetchOrdersFromSupabase]);

  const placeOrder = async (order: Omit<Order, 'id' | 'orderDate' | 'status'>): Promise<string> => {
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const newOrder: Order = {
      ...order,
      id: orderId,
      orderDate: new Date().toISOString(),
      status: 'confirmed',
    };

    setOrders(prev => {
      const nextOrders = [newOrder, ...prev];
      persistOrdersLocally(nextOrders);
      return nextOrders;
    });

    if (supabase) {
      const { error } = await supabase.from('orders').insert({
        id: newOrder.id,
        items: newOrder.items,
        total: newOrder.total,
        address: newOrder.address,
        pincode: newOrder.pincode,
        payment_method: newOrder.paymentMethod,
        status: newOrder.status,
        order_date: newOrder.orderDate,
      });
      if (error) {
        console.error('Failed to persist order to Supabase', error.message);
      } else {
        fetchOrdersFromSupabase();
      }
    }

    return orderId;
  };

  const getOrderById = (id: string) => {
    return orders.find(order => order.id === id);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        isSyncing,
        refreshOrders: fetchOrdersFromSupabase,
        placeOrder,
        getOrderById,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

