import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useOrder } from '../context/OrderContext';
import '../styling/home.css';
import '../styling/MyOrders.css';

const MyOrders = () => {
  const navigate = useNavigate();
  const { orders, isSyncing, refreshOrders, cancelOrder } = useOrder();
  const [confirmDialog, setConfirmDialog] = useState<{ isOpen: boolean; orderId: string | null }>({
    isOpen: false,
    orderId: null,
  });
  const [isCancelling, setIsCancelling] = useState(false);

  useEffect(() => {
    refreshOrders();
  }, [refreshOrders]);

  const handleCancelClick = (orderId: string) => {
    setConfirmDialog({ isOpen: true, orderId });
  };

  const handleConfirmCancel = async () => {
    if (!confirmDialog.orderId) return;
    
    setIsCancelling(true);
    try {
      await cancelOrder(confirmDialog.orderId);
      setConfirmDialog({ isOpen: false, orderId: null });
    } catch (error) {
      console.error('Failed to cancel order:', error);
    } finally {
      setIsCancelling(false);
    }
  };

  const handleDialogClose = () => {
    setConfirmDialog({ isOpen: false, orderId: null });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return '#4caf50';
      case 'shipped':
        return '#2196f3';
      case 'confirmed':
        return '#ff9800';
      default:
        return '#757575';
    }
  };

  if (isSyncing) {
    return (
      <div className="home-container loaded">
        <Header />
        <div className="orders-empty-container">
          <div className="orders-empty-content">
            <div className="orders-loading-spinner" />
            <h2>Loading your orders</h2>
            <p>Please wait while we fetch your latest orders.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="home-container loaded">
        <Header />
        <div className="orders-empty-container">
          <div className="orders-empty-content">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <h2>No orders yet</h2>
            <p>Your order history will appear here</p>
            <button className="continue-shopping-btn" onClick={() => navigate('/')}>
              Start Shopping
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="home-container loaded">
      <Header />
      <div className="orders-container">
        <div className="orders-header">
          <h1>My Orders</h1>
          <p>{orders.length} {orders.length === 1 ? 'order' : 'orders'}</p>
        </div>

        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <h3>Order #{order.id}</h3>
                  <p className="order-date">
                    {new Date(order.orderDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <div className="order-status">
                  <span style={{ color: getStatusColor(order.status) }}>
                    {order.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div className="order-item-details">
                      <h4>{item.name}</h4>
                      <p>Size: {item.size} | Qty: {item.quantity}</p>
                      <p className="order-item-price">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <div className="order-shipping-info">
                  <p><strong>Shipping to:</strong> {order.address}</p>
                  <p><strong>Pincode:</strong> {order.pincode}</p>
                  <p><strong>Payment:</strong> {order.paymentMethod}</p>
                </div>
                <div className="order-actions">
                  <div className="order-total">
                    <span>Total: ₹{order.total}</span>
                  </div>
                  {order.status !== 'delivered' && (
                    <button 
                      className="cancel-order-btn" 
                      onClick={() => handleCancelClick(order.id)}
                    >
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cancel Order Confirmation Dialog */}
      {confirmDialog.isOpen && (
        <div className="dialog-overlay" onClick={handleDialogClose}>
          <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <h2>Cancel Order?</h2>
              <button className="dialog-close-btn" onClick={handleDialogClose}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="dialog-body">
              <p>Are you sure you want to cancel this order?</p>
              <p className="dialog-warning">This action cannot be undone. The order will be removed from your account and the backend.</p>
            </div>
            <div className="dialog-actions">
              <button 
                className="dialog-btn cancel-btn" 
                onClick={handleDialogClose}
              >
                Keep Order
              </button>
              <button 
                className="dialog-btn delete-btn" 
                onClick={handleConfirmCancel}
                disabled={isCancelling}
              >
                {isCancelling ? 'Cancelling...' : 'Yes, Cancel Order'}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MyOrders;

