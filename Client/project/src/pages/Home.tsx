import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoginPopup from '../components/LoginPopup';
import { useAuth } from '../context/AuthContext';
import '../styling/home.css';

// Import all images from centralized assets file
import {
  heroImage,
  menCategoryImg,
  womenCategoryImg,
  accessoriesCategoryImg,
  shoesCategoryImg,
  productImg1,
  productImg2,
  productImg3,
  productImg4,
  brandImages,
  genzImages,
  menImages,
  womenImages,
} from '../assets/images';



const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const [carouselIndex, setCarouselIndex] = useState(0);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  // Carousel images - hero images to slide through
  const carouselImages = [heroImage, productImg1, productImg2, productImg3, productImg4];

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

    // Scroll listener to change carousel image
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      const newIndex = Math.floor((scrollPercentage / 100) * carouselImages.length);
      const clampedIndex = Math.min(newIndex, carouselImages.length - 1);
      setCarouselIndex(clampedIndex);
    };

    window.addEventListener('scroll', handleScroll);

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
      window.removeEventListener('scroll', handleScroll);
      observedRefs.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [isAuthenticated, carouselImages.length]);
  const categories = [
    { id: 1, name: "Live Now", image: menCategoryImg, subtitle: "Fresh Arrivals" },
    { id: 2, name: "Westernwear", image: womenCategoryImg, subtitle: "Trending Styles" },
    { id: 3, name: "Indianwear", image: accessoriesCategoryImg, subtitle: "Ethnic Collection" },
    { id: 4, name: "Men", image: shoesCategoryImg, subtitle: "Modern Essentials" },
    { id: 5, name: "Footwear", image: productImg1, subtitle: "Step in Style" },
    { id: 6, name: "Lingerie", image: productImg2, subtitle: "Comfort & Style" },
    { id: 7, name: "Activewear", image: productImg3, subtitle: "Fitness Fashion" },
    { id: 9, name: "Bags", image: heroImage, subtitle: "Carry in Style" },
    { id: 10, name: "Jewellery", image: menCategoryImg, subtitle: "Sparkle & Shine" },
  ];

  const trendingCategories = [
    { id: 1, name: "BAGGY JEANS", image: productImg1, overlayText: "BAGGY\nJEANS" },
    { id: 2, name: "CLASSIC TOTES", image: productImg2, overlayText: "CLASSIC\nTOTES" },
    { id: 3, name: "MAXI DRESSES", image: productImg3, overlayText: "MAXI\nDRESSES" },
    { id: 4, name: "HOOPS", image: productImg4, overlayText: "HOOPS" },
  ];


  return (
    <div className={`home-container ${isLoaded ? 'loaded' : ''}`}>
      <Header />

      {/* Launch Offer Banner - Hero Carousel */}
      <section 
        className="launch-banner" 
        data-section-id="hero"
        ref={(el) => {
          sectionRefs.current['hero'] = el;
        }}
      >
        <div 
          className={`launch-banner-content ${visibleSections.has('hero') || isLoaded ? 'animate-in' : ''}`}
        >
          <div className="launch-banner-image carousel-banner">
            <img 
              src={carouselImages[carouselIndex]} 
              alt="Hero Carousel" 
              className="carousel-img"
              key={carouselIndex}
            />
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
          <h2 className={`section-title-dark ${visibleSections.has('brands') ? 'title-animate' : ''}`}>Brands We Love</h2>
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
            >
              <img src={productImg1} alt="Casual Wear" />
              <div className="style-card-content">
                <h3>Casual Wear</h3>
                <p>Everyday Comfort</p>
                <button className="style-card-btn">Shop Now</button>
              </div>
            </div>
            <div 
              className={`style-card ${visibleSections.has('styles') ? 'style-card-animate' : ''}`}
              style={{ animationDelay: '0.2s' }}
            >
              <img src={productImg2} alt="Formal Wear" />
              <div className="style-card-content">
                <h3>Formal Wear</h3>
                <p>Office Ready</p>
                <button className="style-card-btn">Shop Now</button>
              </div>
            </div>
            <div 
              className={`style-card ${visibleSections.has('styles') ? 'style-card-animate' : ''}`}
              style={{ animationDelay: '0.4s' }}
            >
              <img src={productImg3} alt="Party Wear" />
              <div className="style-card-content">
                <h3>Party Wear</h3>
                <p>Night Out</p>
                <button className="style-card-btn">Shop Now</button>
              </div>
            </div>
            <div 
              className={`style-card style-card-large ${visibleSections.has('styles') ? 'style-card-animate' : ''}`}
              style={{ animationDelay: '0.6s' }}
            >
              <img src={productImg4} alt="Ethnic Wear" />
              <div className="style-card-content">
                <h3>Ethnic Wear</h3>
                <p>Traditional Charm</p>
                <button className="style-card-btn">Shop Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers Banner */}
      <section 
        className="offers-banner-section"
        data-section-id="offers"
        ref={(el) => {
          sectionRefs.current['offers'] = el;
        }}
      >
        <div className="section-container-full">
          <div className={`offers-banner ${visibleSections.has('offers') ? 'animate-in' : ''}`}>
            <div className="offer-content">
              <h2>FLAT 50% OFF</h2>
              <p>On Selected Items - Limited Time Only!</p>
              <button className="shop-now-btn" onClick={() => navigate('/genz')}>Shop Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers - Men Section */}
      <section 
        className="best-sellers-section"
        data-section-id="men-featured"
        ref={(el) => {
          sectionRefs.current['men-featured'] = el;
        }}
      >
        <div className="section-container-full">
          <div className="section-header-with-link">
            <h2 className={`section-title-dark ${visibleSections.has('men-featured') ? 'title-animate' : ''}`}>Best Sellers - Men</h2>
            <button className="view-all-btn" onClick={() => navigate('/men')}>View All</button>
          </div>
          <div className="products-grid-full">
            {menImages.slice(0, 8).map((product, index) => {
              const productPrice = 699 + ((product.id % 1101) + 1);
              return (
                <div 
                  key={product.id} 
                  className={`product-card-modern ${visibleSections.has('men-featured') ? 'card-fade-in' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className="product-image-container">
                    <img src={product.image} alt={product.name} />
                    {index < 3 && <div className="product-discount-badge">50% OFF</div>}
                  </div>
                  <div className="product-details">
                    <div className="product-name-truncate">{product.name}</div>
                    <div className="product-pricing">
                      {index < 3 ? (
                        <>
                          <span className="product-price-main">₹{Math.floor(productPrice * 0.5)}</span>
                          <span className="product-price-old">₹{productPrice}</span>
                        </>
                      ) : (
                        <span className="product-price-main">₹{productPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Best Sellers - Women Section */}
      <section 
        className="best-sellers-section"
        data-section-id="women-featured"
        ref={(el) => {
          sectionRefs.current['women-featured'] = el;
        }}
      >
        <div className="section-container-full">
          <div className="section-header-with-link">
            <h2 className={`section-title-dark ${visibleSections.has('women-featured') ? 'title-animate' : ''}`}>Best Sellers - Women</h2>
            <button className="view-all-btn" onClick={() => navigate('/women')}>View All</button>
          </div>
          <div className="products-grid-full">
            {womenImages.slice(0, 8).map((product, index) => {
              const productPrice = 699 + ((product.id % 1101) + 1);
              return (
                <div 
                  key={product.id} 
                  className={`product-card-modern ${visibleSections.has('women-featured') ? 'card-fade-in' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className="product-image-container">
                    <img src={product.image} alt={product.name} />
                    {index < 3 && <div className="product-discount-badge">40% OFF</div>}
                  </div>
                  <div className="product-details">
                    <div className="product-name-truncate">{product.name}</div>
                    <div className="product-pricing">
                      {index < 3 ? (
                        <>
                          <span className="product-price-main">₹{Math.floor(productPrice * 0.6)}</span>
                          <span className="product-price-old">₹{productPrice}</span>
                        </>
                      ) : (
                        <span className="product-price-main">₹{productPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* New Arrivals - Genz Section */}
      <section 
        className="best-sellers-section"
        data-section-id="featured"
        ref={(el) => {
          sectionRefs.current['featured'] = el;
        }}
      >
        <div className="section-container-full">
          <div className="section-header-with-link">
            <h2 className={`section-title-dark ${visibleSections.has('featured') ? 'title-animate' : ''}`}>New Arrivals - Genz</h2>
            <button className="view-all-btn" onClick={() => navigate('/genz')}>View All</button>
          </div>
          <div className="products-grid-full">
            {genzImages.slice(0, 8).map((product, index) => {
              const productPrice = 699 + ((product.id % 1101) + 1);
              return (
                <div 
                  key={product.id} 
                  className={`product-card-modern ${visibleSections.has('featured') ? 'card-fade-in' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className="product-image-container">
                    <img src={product.image} alt={product.name} />
                    <div className="product-discount-badge">NEW</div>
                  </div>
                  <div className="product-details">
                    <div className="product-name-truncate">{product.name}</div>
                    <div className="product-pricing">
                      <span className="product-price-main">₹{productPrice}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
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