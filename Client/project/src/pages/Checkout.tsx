import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import '../styling/home.css';
import '../styling/Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getTotalPrice, clearCart } = useCart();
  const { placeOrder } = useOrder();

  const [formData, setFormData] = useState({
    address: '',
    pincode: '',
    city: '',
    state: '',
    paymentMethod: 'cod',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'Please select a payment method';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const fullAddress = `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`;
    const total = getTotalPrice() + 50 + (getTotalPrice() * 0.18);

    const orderId = placeOrder({
      items: cart,
      total: Math.round(total),
      address: fullAddress,
      pincode: formData.pincode,
      paymentMethod: formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 
                     formData.paymentMethod === 'card' ? 'Credit/Debit Card' :
                     formData.paymentMethod === 'upi' ? 'UPI' : 'Net Banking',
    });

    clearCart();
    alert(`Order placed successfully! Order ID: ${orderId}`);
    navigate('/orders');
  };

  const subtotal = getTotalPrice();
  const shipping = 50;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  return (
    <div className="home-container loaded">
      <Header />
      <div className="checkout-container">
        <div className="checkout-header">
          <h1>Checkout</h1>
        </div>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <div className="checkout-main">
            <div className="checkout-form-section">
              <h2>Shipping Address</h2>
              
              <div className="form-group">
                <label htmlFor="address">Address *</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Enter your full address"
                  className={errors.address ? 'error' : ''}
                />
                {errors.address && <span className="error-message">{errors.address}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="City"
                    className={errors.city ? 'error' : ''}
                  />
                  {errors.city && <span className="error-message">{errors.city}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    placeholder="State"
                    className={errors.state ? 'error' : ''}
                  />
                  {errors.state && <span className="error-message">{errors.state}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="pincode">Pincode *</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  placeholder="6 digit pincode"
                  maxLength={6}
                  className={errors.pincode ? 'error' : ''}
                />
                {errors.pincode && <span className="error-message">{errors.pincode}</span>}
              </div>

              <h2 className="payment-section-title">Payment Method</h2>
              
              <div className="payment-methods">
                <label className={`payment-option ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                  />
                  <div className="payment-option-content">
                    <span className="payment-option-name">Cash on Delivery</span>
                    <span className="payment-option-desc">Pay when you receive</span>
                  </div>
                </label>

                <label className={`payment-option ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                  />
                  <div className="payment-option-content">
                    <span className="payment-option-name">Credit/Debit Card</span>
                    <span className="payment-option-desc">Visa, Mastercard, Rupay</span>
                  </div>
                </label>

                <label className={`payment-option ${formData.paymentMethod === 'upi' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="upi"
                    checked={formData.paymentMethod === 'upi'}
                    onChange={handleInputChange}
                  />
                  <div className="payment-option-content">
                    <span className="payment-option-name">UPI</span>
                    <span className="payment-option-desc">Paytm, Google Pay, PhonePe</span>
                  </div>
                </label>

                <label className={`payment-option ${formData.paymentMethod === 'netbanking' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="netbanking"
                    checked={formData.paymentMethod === 'netbanking'}
                    onChange={handleInputChange}
                  />
                  <div className="payment-option-content">
                    <span className="payment-option-name">Net Banking</span>
                    <span className="payment-option-desc">All major banks</span>
                  </div>
                </label>
              </div>
              {errors.paymentMethod && <span className="error-message">{errors.paymentMethod}</span>}
            </div>

            <div className="checkout-summary-section">
              <div className="checkout-summary-card">
                <h2>Order Summary</h2>
                <div className="summary-items">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="summary-item">
                      <img src={item.image} alt={item.name} />
                      <div>
                        <p>{item.name}</p>
                        <p>Size: {item.size} × {item.quantity}</p>
                      </div>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(0)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span>₹{shipping}</span>
                </div>
                <div className="summary-row">
                  <span>Tax (18%)</span>
                  <span>₹{tax.toFixed(0)}</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total">
                  <span>Total</span>
                  <span>₹{total.toFixed(0)}</span>
                </div>
                <button type="submit" className="place-order-btn">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;

