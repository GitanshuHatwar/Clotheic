
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styling/Kids.css';
import '../styling/home.css';

const products = [
  { id: 1, name: 'Dinosaur Graphic Tee', price: '$18', image: '/src/assets/products/kids1.jpg' },
  { id: 2, name: 'Playground-Ready Shorts', price: '$22', image: '/src/assets/products/kids2.jpg' },
  { id: 3, name: 'Rainbow-Striped Sweater', price: '$35', image: '/src/assets/products/kids3.jpg' },
  { id: 4, name: 'Light-Up Sneakers', price: '$45', image: '/src/assets/products/kids4.jpg' },
  { id: 5, name: 'Cozy Animal Onesie', price: '$40', image: '/src/assets/products/kids5.jpg' },
  { id: 6, name: 'Funky Print Leggings', price: '$20', image: '/src/assets/products/kids6.jpg' },
  { id: 7, name: 'Waterproof Rain Jacket', price: '$55', image: '/src/assets/products/kids7.jpg' },
  { id: 8, name: 'Cargo Pants with Pockets', price: '$30', image: '/src/assets/products/kids8.jpg' },
  { id: 9, name: 'Sparkly Tulle Skirt', price: '$28', image: '/src/assets/products/kids9.jpg' },
  { id: 10, name: 'Superhero Pajama Set', price: '$32', image: '/src/assets/products/kids10.jpg' },
  { id: 11, name: 'Denim Overalls', price: '$48', image: '/src/assets/products/kids11.jpg' },
  { id: 12, name: 'Fuzzy Slipper Boots', price: '$25', image: '/src/assets/products/kids12.jpg' },
];

const Kids = () => {
  const [isFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);


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
          <h1 className="page-hero-title">Kids' Collection</h1>
          <p className="page-hero-subtitle">Fun, playful, and ready for adventure!</p>
        </div>
      </section>

      <div className="kids-container">
        <aside className={`filter-sidebar ${isFilterOpen ? 'open' : ''}`}>
          <h3>Filters</h3>
          <div className="filter-group">
            <h4>Category</h4>
            <div className="filter-options">
              {['Tops', 'Bottoms', 'Outerwear', 'Footwear', 'Pajamas'].map(category => (
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
            <h4>Age</h4>
            <div className="filter-options">
              {['2-4Y', '4-6Y', '6-8Y', '8-10Y'].map(size => (
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
              max="100"
              value={priceRange[1]}
              onChange={handlePriceChange}
            />
            <div className="price-label">Up to ${priceRange[1]}</div>
          </div>
        </aside>

        <main className="product-grid-container">
          <div className="product-grid-header">
            <h2>Ready for Fun!</h2>
            <div className="sort-options">
              <select>
                <option>Sort by: Popular</option>
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
                <button className="add-to-cart-btn">Add to Cart</button>
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Kids;
