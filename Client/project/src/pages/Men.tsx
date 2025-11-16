import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styling/home.css';

const Men = () => {
  return (
    <div className="home-container loaded">
      <Header />
      
      <section className="page-hero-section">
        <div className="page-hero-content">
          <h1 className="page-hero-title">Men's Collection</h1>
          <p className="page-hero-subtitle">Explore premium men's fashion and style</p>
        </div>
      </section>

      <section className="page-content-section">
        <div className="section-container-full">
          <div className="page-grid">
            <div className="page-card">
              <h2>Casual Wear</h2>
              <p>Everyday comfort and style</p>
            </div>
            <div className="page-card">
              <h2>Formal Wear</h2>
              <p>Office ready professional attire</p>
            </div>
            <div className="page-card">
              <h2>Footwear</h2>
              <p>Premium shoes and sneakers</p>
            </div>
            <div className="page-card">
              <h2>Accessories</h2>
              <p>Complete your look with accessories</p>
            </div>
            <div className="page-card">
              <h2>Activewear</h2>
              <p>Gym and sports essentials</p>
            </div>
            <div className="page-card">
              <h2>Indianwear</h2>
              <p>Traditional and modern ethnic wear</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Men;

