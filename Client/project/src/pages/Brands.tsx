import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styling/home.css';

// Import brand images from centralized assets
import { brandImages } from '../assets/images';

const Brands = () => {
  const brands = brandImages;

  return (
    <div className="home-container loaded">
      <Header />
      
      <section className="page-hero-section">
        <div className="page-hero-content">
          <h1 className="page-hero-title">Our Brands</h1>
          <p className="page-hero-subtitle">Discover premium brands we love and trust</p>
        </div>
      </section>

      <section className="page-content-section">
        <div className="section-container-full">
          <div className="brands-page-grid">
            {brands.map((brand) => (
              <div key={brand.id} className="brand-page-card">
                <div className="brand-page-image-container">
                  <img src={brand.image} alt={brand.name} />
                </div>
                <h3 className="brand-page-name">{brand.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Brands;

