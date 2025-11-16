
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styling/Men.css';
import { menImages } from '../assets/images';

// Generate products with pricing from male Genz images (₹699-₹1800)
const allProducts = menImages.map((item) => ({
  ...item,
  priceValue: 699 + ((item.id % 1101) + 1),
  price: `₹${699 + ((item.id % 1101) + 1)}`,
}));

const Men = () => {
  const navigate = useNavigate();
  const [isFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([699, 1800]);
  const [sortBy, setSortBy] = useState<string>('featured');


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
    setPriceRange([699, parseInt(e.target.value, 10)]);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = allProducts.filter(product => {
      const price = product.priceValue;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    if (sortBy === 'high-low') {
      filtered = [...filtered].sort((a, b) => b.priceValue - a.priceValue);
    } else if (sortBy === 'low-high') {
      filtered = [...filtered].sort((a, b) => a.priceValue - b.priceValue);
    }

    return filtered;
  }, [priceRange, sortBy]);

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
              min="699"
              max="1800"
              value={priceRange[1]}
              onChange={handlePriceChange}
            />
            <div className="price-label">₹{priceRange[0]} - ₹{priceRange[1]}</div>
          </div>
        </aside>

        <main className="product-grid-container">
          <div className="product-grid-header">
            <h2>Men's Collection</h2>
            <div className="sort-options">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="featured">Sort by: Featured</option>
                <option value="low-high">Price: Low to High</option>
                <option value="high-low">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>

          <div className="product-grid">
            {filteredAndSortedProducts.map(product => (
              <div 
                key={product.id} 
                className="product-card"
                onClick={() => navigate(`/product/${product.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="product-image-container">
                  <img src={product.image} alt={product.name} className="product-image" />
                </div>
                <div className="product-info">
                  <h5>{product.name}</h5>
                  <p className="product-price">{product.price}</p>
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

export default Men;
