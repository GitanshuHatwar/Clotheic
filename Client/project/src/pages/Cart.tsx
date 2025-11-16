import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import '../styling/home.css';
import '../styling/Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="home-container loaded">
        <Header />
        <div className="cart-empty-container">
          <div className="cart-empty-content">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything to your cart yet</p>
            <button className="continue-shopping-btn" onClick={() => navigate('/')}>
              Continue Shopping
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
      <div className="cart-container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p className="cart-item-count">{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
        </div>

        <div className="cart-content">
          <div className="cart-items-section">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="cart-item">
                <div className="cart-item-image" onClick={() => navigate(`/product/${item.id}`)}>
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-details">
                  <h3 onClick={() => navigate(`/product/${item.id}`)}>{item.name}</h3>
                  <p className="cart-item-size">Size: {item.size}</p>
                  <p className="cart-item-price">₹{item.price}</p>
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}>
                      +
                    </button>
                  </div>
                  <button 
                    className="remove-item-btn"
                    onClick={() => removeFromCart(item.id, item.size)}
                  >
                    Remove
                  </button>
                </div>
                <div className="cart-item-total">
                  <span>₹{item.price * item.quantity}</span>
                </div>
              </div>
            ))}
            <button className="clear-cart-btn" onClick={clearCart}>
              Clear Cart
            </button>
          </div>

          <div className="cart-summary-section">
            <div className="cart-summary-card">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{getTotalPrice()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>₹50</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>₹{(getTotalPrice() * 0.18).toFixed(0)}</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{(getTotalPrice() + 50 + (getTotalPrice() * 0.18)).toFixed(0)}</span>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
              <button className="continue-shopping-btn" onClick={() => navigate('/')}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;

