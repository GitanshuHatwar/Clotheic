import { useMemo, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import FindByImage from './FindByImage';

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement | null>(null);
  const expectedDeliveryDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 5);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    closeMobileMenu();
  };

  // Search suggestions (static + can be extended)
  const suggestions: string[] = [
    'boy shirt under 1000',
    'baggy jeans for girls',
    'crop top',
    'baggy jeans',
    "men's t-shirt",
    'white jeans',
  ];

  const filteredSuggestions = suggestions.filter(s => {
    if (!searchQuery.trim()) return true;
    return s.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const navigateToSearch = (q: string) => {
    const query = q || searchQuery;
    if (!query || !query.trim()) return;
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const el = searchRef.current;
      if (el && !el.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    if (isSearchOpen) document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, [isSearchOpen]);

  return (
    <>
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
              {/* Search - toggles input and suggestions */}
              <div className="search-wrapper">
                <button
                  className="icon-btn search-toggle"
                  aria-label="Search"
                  onClick={() => setIsSearchOpen((v) => !v)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>
                </button>
                {isSearchOpen && (
                  <div className="search-bar" ref={searchRef}>
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search products, e.g. 'baggy jeans for girls'"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') navigateToSearch(searchQuery);
                        if (e.key === 'Escape') setIsSearchOpen(false);
                      }}
                    />
                    <div className="search-suggestions">
                      {filteredSuggestions.map((s, i) => (
                        <div
                          key={i}
                          className="suggestion-item"
                          onClick={() => navigateToSearch(s)}
                        >
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
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
              <button 
                className="mobile-menu-btn icon-btn"
                aria-label="Menu"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  {isMobileMenuOpen ? (
                    <path d="M18 6L6 18M6 6l12 12" />
                  ) : (
                    <>
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Navigation */}
      <div 
        className={`mobile-sidebar-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={closeMobileMenu}
      >
        <nav 
          className={`mobile-sidebar ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mobile-sidebar-header">
            <h2>Menu</h2>
            <button 
              className="mobile-sidebar-close"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="mobile-sidebar-content">
            <div className="mobile-sidebar-find-image">
              <FindByImage />
            </div>
            <div className="mobile-sidebar-divider"></div>
            <Link to="/" className="mobile-nav-link" onClick={handleNavClick}>Home</Link>
            <Link to="/women" className="mobile-nav-link" onClick={handleNavClick}>Women</Link>
            <Link to="/men" className="mobile-nav-link" onClick={handleNavClick}>Men</Link>
            <Link to="/genz" className="mobile-nav-link" onClick={handleNavClick}>Genz</Link>
            <Link to="/collections" className="mobile-nav-link" onClick={handleNavClick}>Brands</Link>
            <div className="mobile-track-section">
              <div className="mobile-track-header">
                <h3>Track your order</h3>
                <Link to="/orders" className="mobile-track-btn" onClick={handleNavClick}>
                  Track Order
                </Link>
              </div>
              <div className="mobile-track-statuses">
                <div className="track-status confirmed">
                  <span>Order Confirmed</span>
                </div>
                <div className="track-status out-for-delivery">
                  <span>Out for Delivery</span>
                </div>
                <div className="track-status eta">
                  <span>Expected delivery: {expectedDeliveryDate}</span>
                </div>
              </div>
            </div>
            {isAuthenticated ? (
              <>
                <Link to="/wishlist" className="mobile-nav-link" onClick={handleNavClick}>Wishlist</Link>
                <Link to="/orders" className="mobile-nav-link" onClick={handleNavClick}>My Orders</Link>
                <div className="mobile-sidebar-divider"></div>
                <div className="mobile-user-info">
                  <span>Hi, {user?.username}</span>
                </div>
                <button onClick={() => { logout(); handleNavClick(); }} className="mobile-nav-link mobile-logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <div className="mobile-sidebar-divider"></div>
                <Link to="/login" className="mobile-nav-link mobile-auth-btn" onClick={handleNavClick}>Login</Link>
                <Link to="/signup" className="mobile-nav-link mobile-auth-btn primary" onClick={handleNavClick}>Sign Up</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
