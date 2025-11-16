import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useWishlist } from '../context/WishlistContext';
import '../styling/home.css';
import '../styling/Wishlist.css';

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="home-container loaded">
        <Header />
        <div className="wishlist-empty-container">
          <div className="wishlist-empty-content">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <h2>Your wishlist is empty</h2>
            <p>Start adding items you love to your wishlist</p>
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
      <div className="wishlist-container">
        <div className="wishlist-header">
          <h1>My Wishlist</h1>
          <p>{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}</p>
        </div>

        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div key={item.id} className="wishlist-item">
              <div 
                className="wishlist-item-image"
                onClick={() => navigate(`/product/${item.id}`)}
              >
                <img src={item.image} alt={item.name} />
                <button 
                  className="remove-wishlist-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromWishlist(item.id);
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </div>
              <div className="wishlist-item-info">
                <h3 onClick={() => navigate(`/product/${item.id}`)}>{item.name}</h3>
                <p className="wishlist-item-price">₹{item.price}</p>
                <button 
                  className="move-to-cart-btn"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;

