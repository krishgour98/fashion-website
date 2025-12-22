import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { brands } from '../data/brands';
import { leviProducts } from '../data/products/leviProducts';
import { tommyProducts } from '../data/products/tommyProducts';
import { zaraProducts } from '../data/products/zaraProducts';
import { raymondProducts } from '../data/products/raymondProducts';
import { mufftiProducts } from '../data/products/muftiProducts.js';
import { hmProducts } from '../data/products/hmProducts.js';
import { peterProducts } from '../data/products/peterProducts.js';
import { CartContext } from '../context/CartContext.jsx';
import { WishlistContext } from '../context/WishlistContext.jsx';
import { DarkModeContext } from '../context/DarkModeContext.jsx';
import { FaArrowLeft } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCard from '../Components/ui/ProductCard';

gsap.registerPlugin(ScrollTrigger);

const BrandPage = () => {
  const { brandId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const { darkMode } = useContext(DarkModeContext);

  const [brand, setBrand] = useState(null);
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const [filterPrice, setFilterPrice] = useState(10000);

  const productGridRef = useRef(null);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`✅ ${product.name} added to cart!`);
  };

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  // Filter & Sort Logic
  useEffect(() => {
    // Find brand safely
    const foundBrand = brands.find((b) => b.id === parseInt(brandId));
    if (!foundBrand) {
      console.warn(`Brand with id ${brandId} not found`);
      setBrand(null);
      setProducts([]);
      return;
    }
    setBrand(foundBrand);

    // Select products based on brandId
    let brandProducts = [];
    switch (parseInt(brandId)) {
      case 1: brandProducts = leviProducts; break;
      case 2: brandProducts = tommyProducts; break;
      case 3: brandProducts = zaraProducts; break;
      case 4: brandProducts = hmProducts; break;
      case 5: brandProducts = raymondProducts; break;
      case 6: brandProducts = mufftiProducts; break;
      case 7: brandProducts = peterProducts; break;
      default: brandProducts = [];
    }

    // Filter by price
    let filtered = brandProducts.filter((p) => {
      const price = typeof p.price === 'string' ? parseInt(p.price.replace(/[^\d]/g, '')) : p.price;
      return price <= filterPrice;
    });

    // Sort
    if (sortBy === 'low-to-high') {
      filtered.sort((a, b) => {
        const aPrice = typeof a.price === 'string' ? parseInt(a.price.replace(/[^\d]/g, '')) : a.price;
        const bPrice = typeof b.price === 'string' ? parseInt(b.price.replace(/[^\d]/g, '')) : b.price;
        return aPrice - bPrice;
      });
    } else if (sortBy === 'high-to-low') {
      filtered.sort((a, b) => {
        const aPrice = typeof a.price === 'string' ? parseInt(a.price.replace(/[^\d]/g, '')) : a.price;
        const bPrice = typeof b.price === 'string' ? parseInt(b.price.replace(/[^\d]/g, '')) : b.price;
        return bPrice - aPrice;
      });
    } else if (sortBy === 'a-to-z') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    console.log('Brand:', foundBrand);
    console.log('Filtered Products:', filtered);
    setProducts(filtered);
  }, [brandId, sortBy, filterPrice]);

  // GSAP Animation
  useEffect(() => {
    if (productGridRef.current && products.length > 0) {
      gsap.killTweensOf(productGridRef.current.children);

      gsap.fromTo(
        productGridRef.current.children,
        { opacity: 0, y: 60, scale: 0.85, rotationX: -10 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.7,
          stagger: { amount: 0.6, ease: 'power2.inOut' },
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: productGridRef.current,
            start: 'top 85%',
            once: false,
          },
        }
      );
    }

    return () => gsap.killTweensOf(productGridRef.current?.children);
  }, [products]);

  // Guard: brand not found
  if (!brand) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-10">
        <h2 className="text-3xl font-bold mb-4">Brand Not Found 😔</h2>
        <p className="mb-6">The brand you are looking for does not exist.</p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className={`relative overflow-hidden ${darkMode ? 'bg-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500'} p-8 text-white`}>
        <div className="relative max-w-6xl mx-auto flex items-center gap-6">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg flex items-center gap-2 font-semibold border border-white/20"
          >
            <FaArrowLeft size={16} /> Back
          </button>
          <div className="relative">
            <img src={brand.img} alt={brand.name} className="w-32 h-32 rounded-full bg-white p-3 object-contain shadow-2xl" />
          </div>
          <div className="flex-1">
            <h1 className="text-5xl md:text-6xl font-extrabold">{brand.name}</h1>
            <p className="text-xl opacity-90 mb-2 font-light">Explore our exclusive {brand.name} collection</p>
            <p className="text-sm opacity-75 font-semibold">{products.length} premium product{products.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>

      {/* Filter & Sort Bar */}
      <div className={`sticky top-16 z-40 ${darkMode ? 'bg-gray-800/80' : 'bg-gray-50/80'} backdrop-blur-md border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} shadow-md`}>
        <div className="max-w-6xl mx-auto p-6 flex flex-col sm:flex-row gap-6 items-center justify-between">
          <div className="flex items-center gap-3">
            <label className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-2 rounded-lg font-medium cursor-pointer border-2 ${
                darkMode
                  ? 'bg-gray-700 text-gray-100 border-gray-600'
                  : 'bg-white text-gray-900 border-gray-300'
              }`}
            >
              <option value="default">Default</option>
              <option value="low-to-high">Price: Low to High</option>
              <option value="high-to-low">Price: High to Low</option>
              <option value="a-to-z">Name: A to Z</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label className={`font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>Max Price:</label>
            <input
              type="range"
              min="0"
              max="10000"
              step="100"
              value={filterPrice}
              onChange={(e) => setFilterPrice(parseInt(e.target.value))}
              className="w-40 cursor-pointer accent-purple-600"
            />
            <span className={`font-bold text-lg ${darkMode ? 'text-purple-400' : 'text-purple-600'}`}>₹{filterPrice}</span>
          </div>

          <div className={`font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            {products.length} product{products.length !== 1 ? 's' : ''}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className={`min-h-screen transition ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto p-6">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" ref={productGridRef}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={handleAddToCart}
                  onWishlist={handleWishlistToggle}
                  isWish={isInWishlist(product.id)}
                  link={`/product/${product.id}`}
                />
              ))}
            </div>
          ) : (
            <div className={`col-span-full text-center py-20 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} border-2 border-dashed ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <div className="mb-4 text-6xl">🔍</div>
              <p className={`text-xl mb-6 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>No products found matching your filters</p>
              <button
                onClick={() => {
                  setSortBy('default');
                  setFilterPrice(10000);
                }}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:scale-105 transition duration-300 shadow-lg"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BrandPage;
