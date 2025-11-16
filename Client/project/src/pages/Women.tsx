
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styling/Women.css';
import '../styling/home.css';

const products = [
  { id: 1, name: 'Elegant Floral Blouse', price: '$75', image: '/src/assets/products/women1.jpg' },
  { id: 2, name: 'High-Waisted Skinny Jeans', price: '$90', image: '/src/assets/products/women2.jpg' },
  { id: 3, name: 'Cashmere Knit Sweater', price: '$180', image: '/src/assets/products/women3.jpg' },
  { id: 4, name: 'Suede Ankle Boots', price: '$220', image: '/src/assets/products/women4.jpg' },
  { id: 5, name: 'Leather Tote Bag', price: '$150', image: '/src/assets/products/women5.jpg' },
  { id: 6, name: 'Silk Neck Scarf', price: '$45', image: '/src/assets/products/women6.jpg' },
  { id: 7, name: 'Tailored Wool Coat', price: '$350', image: '/src/assets/products/women7.jpg' },
  { id: 8, name: 'A-Line Midi Skirt', price: '$110', image: '/src/assets/products/women8.jpg' },
  { id: 9, name: 'Classic Trench Coat', price: '$280', image: '/src/assets/products/women9.jpg' },
  { id: 10, name: 'Lace Bodycon Dress', price: '$190', image: '/src/assets/products/women10.jpg' },
  { id: 11, name: 'Wide-Leg Trousers', price: '$130', image: '/src/assets/products/women11.jpg' },
  { id: 12, name: 'Platform Espadrilles', price: '$160', image: '/src/assets/products/women12.jpg' },
];

const Women = () => {
  const [isFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);


  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceRange([0, parseInt(e.target.value, 10)]);
  };

  return (
    <div className="home-container loaded">
      <Header />
      
      <section className="page-hero-section">
        <div className="page-hero-content">
          <h1 className="page-hero-title">Women's Collection</h1>
          <p className="page-hero-subtitle">Discover timeless elegance and contemporary style</p>
        </div>
      </section>

      <div className="women-container">
        <aside className={`filter-sidebar ${isFilterOpen ? 'open' : ''}`}>
          <h3>Filters</h3>
          <div className="filter-group">
            <h4>Category</h4>
            <div className="filter-options">
              {['Dresses', 'Tops', 'Jeans', 'Outerwear', 'Shoes', 'Accessories'].map(category => (
                <div key={category} className="option">
                  <input
                    type="checkbox"
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                  />
                  <label htmlFor={category}>{category}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Size</h4>
            <div className="filter-options">
              {['XS', 'S', 'M', 'L', 'XL'].map(size => (
                <div key={size} className="option">
                  <input
                    type="checkbox"
                    id={size}
                    checked={selectedSizes.includes(size)}
                    onChange={() => toggleSize(size)}
                  />
                  <label htmlFor={size}>{size}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Price</h4>
            <input
              type="range"
              min="0"
              max="500"
              value={priceRange[1]}
              onChange={handlePriceChange}
            />
            <div className="price-label">Up to ${priceRange[1]}</div>
          </div>
        </aside>

        <main className="product-grid-container">
          <div className="product-grid-header">
            <h2>Timeless Pieces</h2>
            <div className="sort-options">
              <select>
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          <div className="product-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image-container">
                  <img src={product.image} alt={product.name} className="product-image" />
                </div>
                <div className="product-info">
                  <h5>{product.name}</h5>
                  <p>{product.price}</p>
                </div>
                <button className="quick-view-btn">Quick View</button>
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Women;
