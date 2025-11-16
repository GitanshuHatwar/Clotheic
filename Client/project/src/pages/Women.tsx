import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styling/home.css';

const Women = () => {
  return (
    <div className="home-container loaded">
      <Header />
      
      <section className="page-hero-section">
        <div className="page-hero-content">
          <h1 className="page-hero-title">Women's Collection</h1>
          <p className="page-hero-subtitle">Discover the latest trends in women's fashion</p>
        </div>
      </section>

      <section className="page-content-section">
        <div className="section-container-full">
          <div className="page-grid">
            <div className="page-card">
              <h2>Westernwear</h2>
              <p>Modern and trendy western outfits</p>
            </div>
            <div className="page-card">
              <h2>Indianwear</h2>
              <p>Elegant ethnic collection</p>
            </div>
            <div className="page-card">
              <h2>Footwear</h2>
              <p>Step in style with our shoe collection</p>
            </div>
            <div className="page-card">
              <h2>Lingerie</h2>
              <p>Comfort and style combined</p>
            </div>
            <div className="page-card">
              <h2>Activewear</h2>
              <p>Fitness fashion for active lifestyle</p>
            </div>
            <div className="page-card">
              <h2>Bags</h2>
              <p>Carry in style with our bag collection</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Women;

