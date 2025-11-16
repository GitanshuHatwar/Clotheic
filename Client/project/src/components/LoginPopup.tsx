import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styling/auth.css';

const LoginPopup = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      onClose();
    }
  }, [isAuthenticated, onClose]);

  if (isAuthenticated) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="popup-close" onClick={onClose}>×</button>
        <div className="popup-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <h2 className="popup-title">Get Personalized Feed</h2>
        <p className="popup-message">
          Sign in to discover fashion tailored to your style preferences and interests!
        </p>
        <div className="popup-actions">
          <button onClick={onClose} className="popup-btn-secondary">Maybe Later</button>
          <button onClick={() => navigate('/login')} className="popup-btn-primary">Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;


