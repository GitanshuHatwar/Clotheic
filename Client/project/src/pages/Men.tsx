
import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styling/Men.css';

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

const Men = () => {
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
      <div className="men-container">
        <aside className={`filter-sidebar ${isFilterOpen ? 'open' : ''}`}>
          <h3>Filters</h3>
          <div className="filter-group">
            <h4>Category</h4>
            <div className="filter-options">
              {['T-Shirts', 'Chinos', 'Jackets', 'Shoes', 'Accessories'].map(category => (
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
              {['S', 'M', 'L', 'XL'].map(size => (
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
            <h2>Men's Collection</h2>
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

export default Men;
