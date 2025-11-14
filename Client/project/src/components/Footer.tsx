import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>CLOTHIC</h3>
            <p>
              Your destination for modern, trendy fashion. Discover the latest styles and elevate your wardrobe.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">FB</a>
              <a href="#" className="social-link" aria-label="Instagram">IG</a>
              <a href="#" className="social-link" aria-label="Twitter">TW</a>
              <a href="#" className="social-link" aria-label="Pinterest">PT</a>
            </div>
          </div>
          <div className="footer-section">
            <h4>Shop</h4>
            <ul>
              <li><Link to="/shop/men">Men's Collection</Link></li>
              <li><Link to="/shop/women">Women's Collection</Link></li>
              <li><Link to="/shop/accessories">Accessories</Link></li>
              <li><Link to="/shop/sale">Sale</Link></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><a href="#careers">Careers</a></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#shipping">Shipping Info</a></li>
              <li><a href="#returns">Returns</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#size-guide">Size Guide</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Clothic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
