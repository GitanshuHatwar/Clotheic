import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginPopup from '../components/LoginPopup';
import { useAuth } from '../context/AuthContext';
import '../styling/home.css';

// Import all images from centralized assets file
import {
  brandImages,
  slideshowImages,
  shopByCategoryImages,
  trendingCategoryImages,
  styleImages,
} from '../assets/images';



const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [slideshowIndex, setSlideshowIndex] = useState(0);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Slideshow images

  useEffect(() => {
    // Trigger intro animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 0);

    // Show login popup after 5 seconds if not authenticated
    const popupTimer = setTimeout(() => {
      if (!isAuthenticated) {
        const hasSeenPopup = localStorage.getItem('clothic_popup_seen');
        if (!hasSeenPopup) {
          setShowLoginPopup(true);
        }
      }
    }, 5000);

    // Slideshow auto-rotation (5 second interval)
    const slideshowInterval = setInterval(() => {
      setSlideshowIndex((prev) => (prev + 1) % slideshowImages.length);
    }, 5000);

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section-id');
          if (sectionId) {
            setVisibleSections((prev) => new Set(prev).add(sectionId));
          }
        }
      });
    }, observerOptions);

    // Observe all sections after a brief delay to ensure refs are set
    let observedRefs: (HTMLElement | null)[] = [];
    const observeTimer = setTimeout(() => {
      const refs = sectionRefs.current;
      observedRefs = Object.values(refs);
      observedRefs.forEach((ref) => {
        if (ref) observer.observe(ref);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      clearTimeout(popupTimer);
      clearTimeout(observeTimer);
      clearInterval(slideshowInterval);
      observedRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [isAuthenticated]);

  const categories = shopByCategoryImages;

  const trendingCategories = trendingCategoryImages;


  return (
    <div className={`home-container ${isLoaded ? 'loaded' : ''}`}>
      <Header />

      {/* Slideshow Section */}
      <section
        className="slideshow-section"
        data-section-id="slideshow"
        ref={(el) => {
          sectionRefs.current['slideshow'] = el;
        }}
      >
        <div className="slideshow-container">
          <div className="slideshow-wrapper">
            <img
              src={slideshowImages[slideshowIndex]}
              alt="Slideshow"
              className="slideshow-image"
              key={slideshowIndex}
            />
          </div>
          <div className="slideshow-dots">
            {slideshowImages.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === slideshowIndex ? 'active' : ''}`}
                onClick={() => setSlideshowIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category - Horizontal Scroll */}
      <section 
        className="shop-categories-section"
        data-section-id="categories"
        ref={(el) => {
          sectionRefs.current['categories'] = el;
        }}
      >
        <div className="section-container-full">
          <div className={`categories-scroll-wrapper ${visibleSections.has('categories') ? 'animate-in' : ''}`}>
            <div className="categories-scroll">
              {categories.map((category, index) => (
                <div 
                  key={category.id} 
                  className={`category-scroll-card ${visibleSections.has('categories') ? 'card-animate' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => navigate('/genz')}
                >
                  <div className="category-scroll-image">
                    <img src={category.image} alt={category.name} />
                  </div>
                  <div className="category-scroll-info">
                    <h3>{category.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending Now Section */}
      <section 
        className="trending-section"
        data-section-id="trending"
        ref={(el) => {
          sectionRefs.current['trending'] = el;
        }}
      >
        <div className="section-container-full">
          <div className="section-header-premium">
            <h2 className={`trending-title ${visibleSections.has('trending') ? 'title-animate' : ''}`}>Trending Now</h2>
            <div className="offers-badge">Special Offers</div>
          </div>
          <div className="trending-grid">
            {trendingCategories.map((item, index) => (
              <div 
                key={item.id} 
                className={`trending-card premium-card ${visibleSections.has('trending') ? 'card-fade-in' : ''}`}
                style={{ animationDelay: `${index * 0.15}s` }}
                onClick={() => navigate('/genz')}
              >
                <div className="trending-card-image">
                  <img src={item.image} alt={item.name} />
                  <div className="trending-card-overlay">
                    <h3>{item.overlayText}</h3>
                    <div className="trending-offer">UP TO 50% OFF</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Brands We Love Section */}
      <section 
        className="brands-section"
        data-section-id="brands"
        ref={(el) => {
          sectionRefs.current['brands'] = el;
        }}
      >
        <div className="section-container-full">
          <h2 className={`section-title-dark ${visibleSections.has('brands') ? 'title-animate' : ''}`}>  Brands We Love</h2>
          <div className="brands-grid">
            {brandImages.map((brand, index) => (
              <div 
                key={brand.id} 
                className={`brand-card ${visibleSections.has('brands') ? 'brand-animate' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate('/men')}
              >
                <div className="brand-logo-container">
                  <img src={brand.image} alt={brand.name} className="brand-logo-image" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Style Section */}
      <section 
        className="style-section"
        data-section-id="styles"
        ref={(el) => {
          sectionRefs.current['styles'] = el;
        }}
      >
        <div className="section-container-full">
          <h2 className={`section-title-dark ${visibleSections.has('styles') ? 'title-animate' : ''}`}>Shop by Style</h2>
          <div className="style-grid">
            <div 
              className={`style-card style-card-large ${visibleSections.has('styles') ? 'style-card-animate' : ''}`}
              style={{ animationDelay: '0s' }}
              onClick={() => navigate('/genz')}
            >
              <img src={styleImages[0].image} alt={styleImages[0].name} />
              <div className="style-card-content">
                <h3>{styleImages[0].name}</h3>
                <p>{styleImages[0].description}</p>
                <button className="style-card-btn" onClick={(e) => { e.stopPropagation(); navigate('/genz'); }}>Shop Now</button>
              </div>
            </div>
            <div 
              className={`style-card ${visibleSections.has('styles') ? 'style-card-animate' : ''}`}
              style={{ animationDelay: '0.2s' }}
              onClick={() => navigate('/genz')}
            >
              <img src={styleImages[1].image} alt={styleImages[1].name} />
              <div className="style-card-content">
                <h3>{styleImages[1].name}</h3>
                <p>{styleImages[1].description}</p>
                <button className="style-card-btn" onClick={(e) => { e.stopPropagation(); navigate('/genz'); }}>Shop Now</button>
              </div>
            </div>
            <div 
              className={`style-card ${visibleSections.has('styles') ? 'style-card-animate' : ''}`}
              style={{ animationDelay: '0.4s' }}
              onClick={() => navigate('/genz')}
            >
              <img src={styleImages[2].image} alt={styleImages[2].name} />
              <div className="style-card-content">
                <h3>{styleImages[2].name}</h3>
                <p>{styleImages[2].description}</p>
                <button className="style-card-btn" onClick={(e) => { e.stopPropagation(); navigate('/genz'); }}>Shop Now</button>
              </div>
            </div>
            <div 
              className={`style-card style-card-large ${visibleSections.has('styles') ? 'style-card-animate' : ''}`}
              style={{ animationDelay: '0.6s' }}
              onClick={() => navigate('/genz')}
            >
              <img src={styleImages[3].image} alt={styleImages[3].name} />
              <div className="style-card-content">
                <h3>{styleImages[3].name}</h3>
                <p>{styleImages[3].description}</p>
                <button className="style-card-btn" onClick={(e) => { e.stopPropagation(); navigate('/genz'); }}>Shop Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>



   
      <section 
        className="newsletter-section-modern"
        data-section-id="newsletter"
        ref={(el) => {
          sectionRefs.current['newsletter'] = el;
        }}
      >
        <div className="section-container">
          <div className={`newsletter-content-modern ${visibleSections.has('newsletter') ? 'newsletter-animate' : ''}`}>
            <h2>Get Latest Updates</h2>
            <p>Subscribe to our newsletter for exclusive offers and style tips</p>
            <form className="newsletter-form-modern">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="newsletter-input-modern"
              />
              <button type="submit" className="newsletter-btn-modern">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      <Footer />

      {showLoginPopup && (
        <LoginPopup 
          onClose={() => {
            setShowLoginPopup(false);
            localStorage.setItem('clothic_popup_seen', 'true');
          }} 
        />
      )}
    </div>
  );
};

export default Home;