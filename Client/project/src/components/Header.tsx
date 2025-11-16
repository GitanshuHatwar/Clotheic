import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import FindByImage from './FindByImage';

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { getTotalItems } = useCart();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <h1>CLOTHIC</h1>
            </Link>
          </div>
          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/women" className="nav-link">Women</Link>
            <Link to="/men" className="nav-link">Men</Link>
            <Link to="/genz" className="nav-link">Genz</Link>
            <Link to="/collections" className="nav-link">Brands</Link>
            {isAuthenticated && (
              <>
                <Link to="/wishlist" className="nav-link">Wishlist</Link>
                <Link to="/orders" className="nav-link">My Orders</Link>
              </>
            )}
          </nav>
          <div className="header-actions">
            <FindByImage />
            {isAuthenticated ? (
              <>
                <span className="user-greeting">Hi, {user?.username}</span>
                <button onClick={logout} className="auth-link-btn">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className="auth-link-btn">Login</Link>
                <Link to="/signup" className="auth-link-btn primary">Sign Up</Link>
              </>
            )}
            <button className="icon-btn" aria-label="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
            <button 
              className="icon-btn cart-btn" 
              aria-label="Cart"
              onClick={() => navigate('/cart')}
              style={{ position: 'relative' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {getTotalItems() > 0 && (
                <span className="cart-badge">{getTotalItems()}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
