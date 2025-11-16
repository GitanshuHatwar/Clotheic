import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styling/home.css';

const About = () => {
  return (
    <div className="home-container loaded">
      <Header />
      
      <section className="page-hero-section">
        <div className="page-hero-content">
          <h1 className="page-hero-title">About CLOTHIC</h1>
          <p className="page-hero-subtitle">Your Fashion Destination</p>
        </div>
      </section>

      <section className="page-content-section">
        <div className="section-container-full">
          <div className="about-content">
            <div className="about-section">
              <h2>Our Story</h2>
              <p>
                CLOTHIC is a premier fashion destination that brings together the latest trends, 
                timeless classics, and exclusive collections from top brands. Founded with a vision 
                to make fashion accessible to everyone, we curate a diverse range of clothing, 
                accessories, and footwear for men, women, and kids.
              </p>
            </div>

            <div className="about-section">
              <h2>Our Mission</h2>
              <p>
                Our mission is to inspire confidence and self-expression through fashion. We believe 
                that everyone deserves to look and feel their best, which is why we offer a wide 
                selection of high-quality products at competitive prices. We're committed to providing 
                an exceptional shopping experience with personalized recommendations and excellent 
                customer service.
              </p>
            </div>

            <div className="about-section">
              <h2>What We Offer</h2>
              <ul className="about-list">
                <li>Curated collections from premium brands</li>
                <li>Trending fashion for every occasion</li>
                <li>Personalized shopping experience</li>
                <li>Exclusive deals and offers</li>
                <li>Wide range of sizes and styles</li>
                <li>Fast and reliable delivery</li>
              </ul>
            </div>

            <div className="about-section">
              <h2>Our Values</h2>
              <div className="values-grid">
                <div className="value-card">
                  <h3>Quality</h3>
                  <p>We ensure every product meets our high standards of quality and craftsmanship.</p>
                </div>
                <div className="value-card">
                  <h3>Style</h3>
                  <p>We stay ahead of trends to bring you the latest in fashion and style.</p>
                </div>
                <div className="value-card">
                  <h3>Customer First</h3>
                  <p>Your satisfaction is our priority. We're here to help you find your perfect style.</p>
                </div>
                <div className="value-card">
                  <h3>Sustainability</h3>
                  <p>We're committed to sustainable fashion and ethical business practices.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;

