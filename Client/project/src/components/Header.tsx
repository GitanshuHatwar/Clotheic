import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FindByImage from './FindByImage';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();

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
            <Link to="/shop" className="nav-link">Women</Link>
            <Link to="/men" className="nav-link">Men</Link>
            <Link to="/kids" className="nav-link">Kids</Link>
            <Link to="/genz" className="nav-link">Genz</Link>
            <Link to="/collections" className="nav-link">Brands</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
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
            <button className="icon-btn" aria-label="Cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
