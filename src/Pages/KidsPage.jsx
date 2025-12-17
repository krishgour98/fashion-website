import React, { useContext, useEffect, useRef, useState } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import { WishlistContext } from '../context/WishlistContext.jsx';
import { DarkModeContext } from '../context/DarkModeContext.jsx';
import { FaShoppingCart, FaHeart, FaTrophy, FaFire, FaArrowRight } from 'react-icons/fa';
import { kidsProducts } from '../data/categoryProducts';
import ProductCard from '../Components/ui/ProductCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const KidsPage = () => {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const { darkMode } = useContext(DarkModeContext);
  const [showAllProducts, setShowAllProducts] = useState(false);

  const productsRef = useRef(null);
  const bestSellersRef = useRef(null);
  const trendingRef = useRef(null);
  const particlesRef = useRef(null);

  // Filter kids-specific items
  const kidsSpecificItems = kidsProducts.filter(
    (p) =>
      p.name.toLowerCase().includes('kids') ||
      p.name.toLowerCase().includes('children') ||
      p.category?.toLowerCase().includes('kids') ||
      p.id >= 501 // Kids product IDs start from 501
  );

  const displayedProducts = showAllProducts ? kidsSpecificItems : kidsSpecificItems.slice(0, 8);
  const bestSellers = kidsSpecificItems.slice(2, 7);
  const trendingProducts = kidsSpecificItems.slice(0, 5);

  // Floating particles effect with drift & rotation
  useEffect(() => {
    const particlesContainer = particlesRef.current;
    if (!particlesContainer) return;

    const createParticle = () => {
      const particle = document.createElement('div');
      const size = Math.random() * 4 + 2;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;

      particle.className = 'fixed pointer-events-none rounded-full';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.zIndex = '0';

      // Colors based on mode
      if (darkMode) {
        const r = Math.floor(Math.random() * 100 + 100);
        const g = Math.floor(Math.random() * 100 + 100);
        const b = 255;
        particle.style.background = `rgba(${r}, ${g}, ${b}, 0.6)`;
        particle.style.boxShadow = `0 0 ${Math.random() * 8 + 2}px rgba(${r}, ${g}, ${b}, 0.7)`;
      } else {
        particle.style.background = `rgba(59, 130, 246, 0.4)`;
        particle.style.boxShadow = `0 0 ${Math.random() * 6 + 2}px rgba(59, 130, 246, 0.5)`;
      }

      particlesContainer.appendChild(particle);

      // Animate with fall + horizontal drift + rotation + fade
      gsap.to(particle, {
        y: window.innerHeight + 100,
        x: `+=${Math.random() * 100 - 50}`, // drift left/right
        rotation: Math.random() * 360,
        opacity: 0,
        duration: Math.random() * 15 + 10,
        ease: 'linear',
        onComplete: () => particle.remove(),
      });
    };

    // Initial burst of particles
    for (let i = 0; i < 20; i++) {
      createParticle();
    }

    // Continuous creation
    const particleInterval = setInterval(createParticle, 150);

    return () => clearInterval(particleInterval);
  }, [darkMode]);

  // GSAP scroll-trigger animations for products
  useEffect(() => {
    if (productsRef.current?.children) {
      gsap.fromTo(
        productsRef.current.children,
        { opacity: 0, y: 60, scale: 0.85 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: productsRef.current, start: 'top 85%', once: false },
        }
      );
    }

    if (bestSellersRef.current?.children) {
      gsap.fromTo(
        bestSellersRef.current.children,
        { opacity: 0, x: -40, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: { trigger: bestSellersRef.current, start: 'top 85%', once: false },
        }
      );
    }

    if (trendingRef.current?.children) {
      gsap.fromTo(
        trendingRef.current.children,
        { opacity: 0, y: 60, scale: 0.85 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: { trigger: trendingRef.current, start: 'top 85%', once: false },
        }
      );
    }
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`✅ ${product.name} added to cart!`);
  };

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 relative ${
        darkMode
          ? 'bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950'
          : 'bg-gradient-to-b from-blue-50 via-cyan-50 to-blue-50'
      }`}
    >
      {/* Floating Particles */}
      <div ref={particlesRef} className="fixed inset-0 pointer-events-none z-0"></div>

      {/* Hero Section */}
      <section
        className={`relative overflow-hidden py-20 px-6 ${
          darkMode
            ? 'bg-gradient-to-r from-blue-950 via-cyan-900 to-blue-950'
            : 'bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500'
        } text-white z-10`}
      >
        <div className="absolute top-10 right-10 w-64 h-64 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 left-20 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-cyan-400 rounded-full blur-3xl opacity-15 animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg animate-bounce" style={{ animationDelay: '0.1s' }}>👕 Kids Collection</h1>
          <p className={`text-lg md:text-xl ${darkMode ? 'text-gray-200' : 'text-blue-100'}`}>
            Comfortable, safe & stylish clothing for your little ones
          </p>
          <p className="text-sm mt-4 opacity-90">Trusted by parents • Premium Quality • Affordable Prices</p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-20">
        <div className={`mb-12 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          <h2 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <FaFire className="text-orange-500 animate-bounce" /> Featured Products
          </h2>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Hand-picked items for your kids • Explore our collection</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" ref={productsRef}>
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={handleAddToCart}
              onWishlist={handleWishlistToggle}
              isWish={isInWishlist(product.id)}
              link={`/product/kids/${product.id}`}
            />
          ))}
        </div>

        {!showAllProducts && kidsSpecificItems.length > 8 && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAllProducts(true)}
              className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                darkMode
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-lg hover:shadow-cyan-500/50'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-400/50'
              }`}
            >
              Explore More Products
              <FaArrowRight className="animate-bounce" />
            </button>
          </div>
        )}

        {showAllProducts && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAllProducts(false)}
              className={`flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                darkMode
                  ? 'bg-gradient-to-r from-gray-700 to-gray-800 text-white hover:shadow-lg hover:shadow-gray-500/30'
                  : 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900 hover:shadow-lg hover:shadow-gray-400/30'
              }`}
            >
              Show Less
              <FaArrowRight className="rotate-180" />
            </button>
          </div>
        )}
      </section>

      {/* Best Sellers */}
      <section className={`max-w-7xl mx-auto px-6 py-16 relative z-20 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <FaTrophy className="text-yellow-500 animate-spin" style={{ animationDuration: '3s' }} /> Best Sellers
          </h2>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Most loved by parents & kids • Highest rated</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6" ref={bestSellersRef}>
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={handleAddToCart}
              onWishlist={handleWishlistToggle}
              isWish={isInWishlist(product.id)}
              link={`/product/kids/${product.id}`}
            />
          ))}
        </div>
      </section>

      {/* Trending Now */}
      <section className={`max-w-7xl mx-auto px-6 py-16 relative z-20 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <FaFire className="text-red-500 animate-bounce" /> Trending Now
          </h2>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Hot picks this season • What's popular</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6" ref={trendingRef}>
          {trendingProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={handleAddToCart}
              onWishlist={handleWishlistToggle}
              isWish={isInWishlist(product.id)}
              link={`/product/kids/${product.id}`}
            />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className={`max-w-7xl mx-auto px-6 py-16 relative z-20 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        <h2 className="text-4xl font-bold mb-12 text-center">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '✓', title: 'Quality Fabrics', desc: 'Soft, breathable & safe materials perfect for sensitive skin' },
            { icon: '✓', title: 'Trendy Designs', desc: 'Modern styles that kids love to wear every day' },
            { icon: '✓', title: 'Fast Shipping', desc: 'Quick delivery to your doorstep in 2-3 days' },
          ].map((item, i) => (
            <div
              key={i}
              className={`p-8 rounded-2xl transition duration-300 transform hover:scale-105 ${
                darkMode
                  ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:shadow-lg hover:shadow-cyan-500/30'
                  : 'bg-gradient-to-br from-white to-blue-50 border border-blue-200 hover:shadow-lg hover:shadow-blue-400/30'
              }`}
            >
              <div className={`text-4xl mb-4 ${i === 0 ? 'text-cyan-400' : i === 1 ? 'text-yellow-400' : 'text-green-400'}`}>{item.icon}</div>
              <h3 className="text-xl font-bold mb-2">{item.title}</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className={`max-w-7xl mx-auto px-6 py-16 rounded-3xl text-center relative z-20 ${
        darkMode
          ? 'bg-gradient-to-r from-blue-900 to-cyan-900'
          : 'bg-gradient-to-r from-blue-400 to-cyan-400'
      } text-white mb-8`}>
        <h2 className="text-3xl font-bold mb-4">🎁 Special Offer!</h2>
        <p className="text-lg mb-6">Subscribe to get 15% off on your next order</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-6 py-3 rounded-full text-gray-900 w-full max-w-xs focus:outline-none"
          />
          <button className={`px-8 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 ${
            darkMode
              ? 'bg-white text-blue-900 hover:shadow-lg hover:shadow-white/30'
              : 'bg-white text-blue-600 hover:shadow-lg hover:shadow-white/50'
          }`}>
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
};

export default KidsPage;
