
import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styling/Men.css';
import '../styling/home.css';

const products = [
  { id: 1, name: 'Classic Crewneck T-Shirt', price: '$25', image: '/src/assets/products/img1.jpg' },
  { id: 2, name: 'Slim-Fit Chinos', price: '$60', image: '/src/assets/products/img2.jpg' },
  { id: 3, name: 'Vintage Denim Jacket', price: '$120', image: '/src/assets/products/img3.jpg' },
  { id: 4, name: 'Leather Derby Shoes', price: '$150', image: '/src/assets/products/img4.jpg' },
  { id: 5, name: 'Knit Beanie', price: '$20', image: '/src/assets/products/img5.jpg' },
  { id: 6, name: 'Wool-Cashmere Blend Scarf', price: '$75', image: '/src/assets/products/img6.jpg' },
  { id: 7, name: 'Long-Sleeve Henley', price: '$45', image: '/src/assets/products/img7.jpg' },
  { id: 8, name: 'Modern Fit Suit', price: '$450', image: '/src/assets/products/cool.jpg' },
  { id: 9, name: 'Modern Fit Suit', price: '$450', image: '/src/assets/products/cool.jpg' },
  { id: 10, name: 'Modern Fit Suit', price: '$450', image: '/src/assets/products/cool.jpg' },
  { id: 11, name: 'Modern Fit Suit', price: '$450', image: '/src/assets/products/cool.jpg' },
  { id: 12, name: 'Modern Fit Suit', price: '$450', image: '/src/assets/products/cool.jpg' },
  { id: 13, name: 'Modern Fit Suit', price: '$450', image: '/src/assets/products/cool.jpg' },
  { id: 14, name: 'Modern Fit Suit', price: '$450', image: '/src/assets/products/cool.jpg' },
  { id: 15, name: 'Modern Fit Suit', price: '$450', image: '/src/assets/products/cool.jpg' },
  { id: 16, name: 'Modern Fit Suit', price: '$450', image: '/src/assets/products/cool.jpg' },
  { id: 17, name: 'Modern Fit Suit', price: '$450', image: '/src/assets/products/cool.jpg' },
  { id: 18, name: 'Modern Fit Suit', price: '$450', image: '/src/assets/products/cool.jpg' },
  { id: 19, name: 'Modern Fit Suit', price: '$450', image: '/src/assets/products/cool.jpg' },
  { id: 20, name: 'Modern Fit Suit', price: '$450', image: '/src/assets/products/cool.jpg' },
];

const Kids = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

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
          <h1 className="page-hero-title">Kid's Collection</h1>
          <p className="page-hero-subtitle">Explore premium men's fashion and style</p>
        </div>
      </section>

      <div className="men-container">
        <aside className={`filter-sidebar ${isFilterOpen ? 'open' : ''}`}>
          <div className="filter-header">
            <h3>Filters</h3>
            <button onClick={toggleFilter} className="close-filter-btn">
              <X size={24} />
            </button>
          </div>

          <div className="filter-group">
            <h4>Category</h4>
            <div className="filter-options">
              {['T-Shirts', 'Chinos', 'Jackets', 'Shoes', 'Accessories'].map(category => (
                <label key={category}>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={() => toggleCategory(category)}
                  />
                  {category}
                </label>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h4>Size</h4>
            <div className="filter-options">
              {['S', 'M', 'L', 'XL'].map(size => (
                <label key={size}>
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() => toggleSize(size)}
                  />
                  {size}
                </label>
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
            <button onClick={toggleFilter} className="open-filter-btn">
              <Filter size={20} />
              <span>Filters</span>
            </button>

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
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-info">
                  <h5>{product.name}</h5>
                  <p>{product.price}</p>
                </div>
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
