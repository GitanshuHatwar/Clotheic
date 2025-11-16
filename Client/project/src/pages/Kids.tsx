import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styling/home.css';

const Kids = () => {
  return (
    <div className="home-container loaded">
      <Header />
      
      <section className="page-hero-section">
        <div className="page-hero-content">
          <h1 className="page-hero-title">Kids Collection</h1>
          <p className="page-hero-subtitle">Fun and comfortable fashion for little ones</p>
        </div>
      </section>

      <section className="page-content-section">
        <div className="section-container-full">
          <div className="page-grid">
            <div className="page-card">
              <h2>Boys Wear</h2>
              <p>Stylish outfits for boys</p>
            </div>
            <div className="page-card">
              <h2>Girls Wear</h2>
              <p>Beautiful dresses and outfits</p>
            </div>
            <div className="page-card">
              <h2>Footwear</h2>
              <p>Comfortable shoes for kids</p>
            </div>
            <div className="page-card">
              <h2>Accessories</h2>
              <p>Fun accessories and accessories</p>
            </div>
            <div className="page-card">
              <h2>School Wear</h2>
              <p>Uniforms and school essentials</p>
            </div>
            <div className="page-card">
              <h2>Party Wear</h2>
              <p>Special occasion outfits</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Kids;

