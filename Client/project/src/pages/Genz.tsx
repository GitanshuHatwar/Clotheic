import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styling/home.css';

const Genz = () => {
  return (
    <div className="home-container loaded">
      <Header />
      
      <section className="page-hero-section">
        <div className="page-hero-content">
          <h1 className="page-hero-title">Gen Z Collection</h1>
          <p className="page-hero-subtitle">Trendy and bold fashion for the new generation</p>
        </div>
      </section>

      <section className="page-content-section">
        <div className="section-container-full">
          <div className="page-grid">
            <div className="page-card">
              <h2>Streetwear</h2>
              <p>Urban and edgy street style</p>
            </div>
            <div className="page-card">
              <h2>Vintage</h2>
              <p>Retro vibes and classic styles</p>
            </div>
            <div className="page-card">
              <h2>Oversized</h2>
              <p>Comfortable oversized fits</p>
            </div>
            <div className="page-card">
              <h2>Graphic Tees</h2>
              <p>Bold prints and statements</p>
            </div>
            <div className="page-card">
              <h2>Accessories</h2>
              <p>Trendy accessories and jewelry</p>
            </div>
            <div className="page-card">
              <h2>Footwear</h2>
              <p>Sneakers and trendy shoes</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Genz;

