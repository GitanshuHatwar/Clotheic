import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { homeBg } from '../assets/images';
import '../styling/auth.css';

const interests = ['modern', 'classic', 'traditional', 'casual', 'party', 'trendy', 'new', 'simple', 'fashion'];

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    customFeed: false,
    age: '',
    gender: '',
    interests: [] as string[],
  });
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleNext = () => {
    setError('');
    if (step === 1) {
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields');
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.username) {
        setError('Please enter a username');
        return;
      }
      if (formData.customFeed) {
        setStep(3);
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = () => {
    if (step === 3) {
      if (!formData.age || !formData.gender || formData.interests.length === 0) {
        setError('Please fill in all fields');
        return;
      }
    }

    signup({
      email: formData.email,
      password: formData.password,
      username: formData.username,
      customFeed: formData.customFeed,
      age: formData.customFeed ? parseInt(formData.age) : undefined,
      gender: formData.customFeed ? formData.gender : undefined,
      interests: formData.customFeed ? formData.interests : undefined,
    });

    navigate('/');
  };

  return (
    <div className="auth-container" style={{ backgroundImage: `url(${homeBg})` }}>
      <div className="auth-overlay"></div>
      <div className="auth-content">
        <div className="auth-card">
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join CLOTHIC and discover your style</p>
          
          <div className="signup-progress">
            <div className={`progress-step ${step >= 1 ? 'active' : ''}`}>1</div>
            <div className={`progress-step ${step >= 2 ? 'active' : ''}`}>2</div>
            {formData.customFeed && <div className={`progress-step ${step >= 3 ? 'active' : ''}`}>3</div>}
          </div>
          
          {error && <div className="auth-error">{error}</div>}
          
          <form onSubmit={(e) => { e.preventDefault(); step === 3 ? handleSubmit() : handleNext(); }} className="auth-form">
            {step === 1 && (
              <>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a password (min 6 characters)"
                    required
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Choose a username"
                    required
                  />
                </div>
                
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="customFeed"
                      checked={formData.customFeed}
                      onChange={handleInputChange}
                    />
                    <span>Enable personalized feed based on my preferences</span>
                  </label>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Enter your age"
                    min="13"
                    max="100"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Interests (Select multiple)</label>
                  <div className="interests-grid">
                    {interests.map(interest => (
                      <label key={interest} className="interest-checkbox">
                        <input
                          type="checkbox"
                          checked={formData.interests.includes(interest)}
                          onChange={() => handleInterestToggle(interest)}
                        />
                        <span>{interest.charAt(0).toUpperCase() + interest.slice(1)}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            <div className="form-actions">
              {step > 1 && (
                <button type="button" onClick={() => setStep(step - 1)} className="auth-btn-secondary">
                  Back
                </button>
              )}
              <button type="submit" className="auth-btn">
                {step === 3 ? 'Complete Signup' : 'Next'}
              </button>
            </div>
          </form>
          
          <p className="auth-footer">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;


