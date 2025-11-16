import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { menImages, womenImages, genzImages } from '../assets/images';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import '../styling/home.css';
import '../styling/ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState<string>('');
  
  // Generate price based on product ID for consistency
  const price = useMemo(() => {
    const basePrice = 699;
    const variation = (parseInt(id || '1') % 1101) + 1; // Range: 1-1101
    return basePrice + variation;
  }, [id]);

  // Combine all products to find the selected one
  const allProducts = useMemo(() => [...menImages, ...womenImages, ...genzImages], []);
  const product = useMemo(() => allProducts.find(p => p.id.toString() === id), [allProducts, id]);

  // Get recommendations (exclude current product)
  const recommendations = useMemo(() => {
    return allProducts
      .filter(p => p.id.toString() !== id)
      .slice(0, 4)
      .map(rec => ({
        ...rec,
        price: 699 + ((rec.id % 1101) + 1) // Consistent price based on ID
      }));
  }, [allProducts, id]);

  useEffect(() => {
    if (!product) {
      // If product not found, redirect to home
      navigate('/');
    }
  }, [product, navigate]);

  if (!product) {
    return null;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart({ id: product.id, name: product.name, image: product.image, price }, selectedSize);
    alert(`Added ${product.name} (Size: ${selectedSize}) to cart!`);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      alert('Removed from wishlist');
    } else {
      addToWishlist({ id: product.id, name: product.name, image: product.image, price });
      alert('Added to wishlist');
    }
  };

  const isWishlisted = isInWishlist(product.id);

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
    window.scrollTo(0, 0);
  };

  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className="home-container loaded">
      <Header />
      
      <div className="product-detail-container">
        <div className="product-detail-main">
          <div className="product-detail-image-section">
            <div className="product-detail-image-wrapper">
              <img src={product.image} alt={product.name} className="product-detail-image" />
            </div>
          </div>

          <div className="product-detail-info-section">
            <h1 className="product-detail-title">{product.name}</h1>
            
            <div className="product-detail-price">
              <span className="price-amount">₹{price}</span>
              <span className="price-inclusive">(Inclusive of all taxes)</span>
            </div>

            <div className="product-detail-size-section">
              <h3 className="size-section-title">Select Size</h3>
              <div className="size-options">
                {sizes.map(size => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="product-detail-actions">
              <button 
                className="add-to-cart-btn-detail"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
              <button 
                className={`wishlist-btn-detail ${isWishlisted ? 'active' : ''}`}
                onClick={handleWishlistToggle}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                {isWishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}
              </button>
            </div>

            <div className="product-detail-description">
              <h3>Product Details</h3>
              <p>
                Premium quality {product.name.toLowerCase()} designed for modern fashion enthusiasts. 
                Made with high-quality materials and attention to detail, this piece combines style and comfort.
              </p>
              <ul>
                <li>Premium quality material</li>
                <li>Comfortable fit</li>
                <li>Easy to care for</li>
                <li>Available in multiple sizes</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="product-recommendations-section">
          <h2 className="recommendations-title">You May Also Like</h2>
          <div className="recommendations-grid">
            {recommendations.map(rec => (
              <div 
                key={rec.id} 
                className="recommendation-card"
                onClick={() => handleProductClick(rec.id)}
              >
                <div className="recommendation-image-container">
                  <img src={rec.image} alt={rec.name} className="recommendation-image" />
                </div>
                <div className="recommendation-info">
                  <h4 className="recommendation-name">{rec.name}</h4>
                  <p className="recommendation-price">₹{rec.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;

