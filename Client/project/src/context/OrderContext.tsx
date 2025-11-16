import { createContext, useContext, useState, ReactNode } from 'react';
import type { CartItem } from './CartContext';

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
  placeOrder: (order: Omit<Order, 'id' | 'orderDate' | 'status'>) => string;
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

  const placeOrder = (order: Omit<Order, 'id' | 'orderDate' | 'status'>): string => {
    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    const newOrder: Order = {
      ...order,
      id: orderId,
      orderDate: new Date().toISOString(),
      status: 'pending',
    };
    setOrders(prev => [newOrder, ...prev]);
    return orderId;
  };

  const getOrderById = (id: string) => {
    return orders.find(order => order.id === id);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        getOrderById,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

