import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styling/home.css';

// Import product images
import heroImage from '../assets/products/img1.jpg';
import menCategoryImg from '../assets/products/img2.jpg';
import womenCategoryImg from '../assets/products/img3.jpg';
import accessoriesCategoryImg from '../assets/products/img4.jpg';
import shoesCategoryImg from '../assets/products/img5.jpg';
import productImg1 from '../assets/products/img1.jpg';
import productImg2 from '../assets/products/img2.jpg';
import productImg3 from '../assets/products/img6.jpg';
import productImg4 from '../assets/products/img7.jpg';

const Home = () => {
  const products = [
    { id: 1, name: 'Trendy Outfit 1', image: productImg1, price: 109.99, oldPrice: 159.99 },
    { id: 2, name: 'Trendy Outfit 2', image: productImg2, price: 119.99, oldPrice: 169.99 },
    { id: 3, name: 'Trendy Outfit 3', image: productImg3, price: 129.99, oldPrice: 179.99 },
    { id: 4, name: 'Trendy Outfit 4', image: productImg4, price: 139.99, oldPrice: 189.99 },
  ];

  return (
    <div className="home-container">
      <Header />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content-wrapper">
          <div className="hero-text">
            <span className="hero-badge">NEW COLLECTION 2024</span>
            <h2 className="hero-title">Elevate Your Style</h2>
            <p className="hero-description">
              Discover the latest trends in fashion. From casual wear to elegant outfits, 
              find your perfect style with Clothic.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary">Shop Now</button>
              <button className="btn-secondary">Explore Collections</button>
            </div>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <img src={heroImage} alt="Fashion Collection" className="hero-image" />
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-container">
          <h2 className="section-title">Shop by Category</h2>
          <div className="categories-grid">
            <div className="category-card">
              <div className="category-image-wrapper">
                <img src={menCategoryImg} alt="Men's Fashion" className="category-image" />
              </div>
              <h3>Men's Fashion</h3>
              <p>Trendy & Modern</p>
            </div>
            <div className="category-card">
              <div className="category-image-wrapper">
                <img src={womenCategoryImg} alt="Women's Fashion" className="category-image" />
              </div>
              <h3>Women's Fashion</h3>
              <p>Elegant & Chic</p>
            </div>
            <div className="category-card">
              <div className="category-image-wrapper">
                <img src={accessoriesCategoryImg} alt="Accessories" className="category-image" />
              </div>
              <h3>Accessories</h3>
              <p>Complete Your Look</p>
            </div>
            <div className="category-card">
              <div className="category-image-wrapper">
                <img src={shoesCategoryImg} alt="Footwear" className="category-image" />
              </div>
              <h3>Footwear</h3>
              <p>Step in Style</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products-section">
        <div className="section-container">
          <div className="section-header">
            <h2 className="section-title">Trending Now</h2>
            <a href="#shop" className="view-all-link">View All →</a>
          </div>
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-image-wrapper">
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="product-badge">New</div>
                  <button className="quick-view-btn">Quick View</button>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-category">Fashion Collection</p>
                  <div className="product-price">
                    <span className="price">${product.price.toFixed(2)}</span>
                    <span className="old-price">${product.oldPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="banner-section">
        <div className="section-container">
          <div className="banner-content">
            <h2>Summer Sale</h2>
            <p>Up to 50% Off on Selected Items</p>
            <button className="banner-btn">Shop Sale</button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="section-container">
          <div className="newsletter-content">
            <h2>Stay in Style</h2>
            <p>
              Subscribe to our newsletter and get the latest fashion trends delivered to your inbox.
            </p>
            <form className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="newsletter-input"
              />
              <button type="submit" className="btn-primary">Subscribe</button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
