import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styling/home.css';

// Import brand images from centralized assets
import { brandImages } from '../assets/images';

const Brands = () => {
  const navigate = useNavigate();
  const brands = brandImages;

  const handleBrandClick = () => {
    navigate('/genz');
  };

  return (
    <div className="home-container loaded">
      <Header />
      
      <section className="page-content-section brands-section">
        <div className="section-container-full">
          <div className="brands-section-header">
            <h1 className="brands-section-title">Our Brands</h1>
            <p className="brands-section-subtitle">Discover premium brands we love and trust</p>
          </div>
          
          <div className="brands-page-grid">
            {brands.map((brand) => (
              <div 
                key={brand.id} 
                className="brand-page-card"
                onClick={handleBrandClick}
                style={{ cursor: 'pointer' }}
              >
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

