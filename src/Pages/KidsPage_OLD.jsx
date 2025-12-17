import React, { useContext, useEffect, useRef } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import { WishlistContext } from '../context/WishlistContext.jsx';
import { DarkModeContext } from '../context/DarkModeContext.jsx';
import { FaShoppingCart, FaHeart, FaTrophy, FaFire } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { kidsProducts } from '../data/categoryProducts';
import ProductCard from '../Components/ui/ProductCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const KidsPage = () => {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);

  const cardsRef = useRef([]);
  const benefitsRef = useRef([]);
  const newsletterRef = useRef(null);
  const particlesRef = useRef(null);

  cardsRef.current = [];
  benefitsRef.current = [];

  const addToCardsRef = (el) => {
    if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el);
  };
  const addToBenefitsRef = (el) => {
    if (el && !benefitsRef.current.includes(el)) benefitsRef.current.push(el);
  };

  // Floating heart animation
  const createHeart = (x, y) => {
    const heart = document.createElement('div');
    heart.className = 'absolute text-red-500';
    heart.innerHTML = '❤️';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.fontSize = `${Math.random() * 20 + 14}px`;
    heart.style.pointerEvents = 'none';
    document.body.appendChild(heart);
    gsap.to(heart, {
      y: -100,
      opacity: 0,
      duration: 1.2,
      ease: 'power1.out',
      onComplete: () => heart.remove(),
    });
  };

  useEffect(() => {
    // Animate product cards
    gsap.from(cardsRef.current, {
      opacity: 0,
      y: 50,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cardsRef.current[0],
        start: 'top 85%',
      },
    });

    // Animate benefits
    benefitsRef.current.forEach((card, i) => {
      gsap.from(card, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        delay: i * 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
        },
      });
    });

    // Animate newsletter
    if (newsletterRef.current) {
      gsap.from(newsletterRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: newsletterRef.current,
          start: 'top 85%',
        },
      });
    }

    // Floating particles
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'absolute bg-purple-500 opacity-20 rounded-full';
      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${Math.random() * window.innerWidth}px`;
      particle.style.top = `${Math.random() * window.innerHeight}px`;
      if (particlesRef.current) particlesRef.current.appendChild(particle);
      gsap.to(particle, {
        y: window.innerHeight + 50,
        duration: Math.random() * 15 + 10,
        ease: 'linear',
        onComplete: () => particle.remove(),
      });
    };
    const interval = setInterval(createParticle, 300);
    return () => clearInterval(interval);
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`✅ ${product.name} added to cart!`);
  };

  const handleWishlistToggle = (e, product) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    createHeart(x, y);

    if (isInWishlist(product.id)) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">

      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none z-0"></div>

      {/* Header */}
      <header className="bg-gradient-to-r from-purple-700 to-indigo-900 py-16 px-6 text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-3 text-white">👕 Kids Collection</h1>
        <p className="text-gray-200 text-lg md:text-xl">Comfortable and stylish clothing for your little ones</p>
      </header>

      {/* Promo Banner */}
      <section className="max-w-7xl mx-auto py-12 px-6 text-center bg-gray-850 rounded-xl my-12 shadow-lg relative z-10">
        <h2 className="text-4xl font-bold mb-4 text-purple-400 animate-pulse">Limited Time Offer!</h2>
        <p className="text-gray-100 mb-6">Get up to 20% off on our kids’ collection this week. Stylish, comfy & safe!</p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition">
          Shop Now
        </button>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        <h2 className="text-3xl font-bold mb-10 text-gray-100">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {kidsProducts.map((product) => (
            <div
              key={product.id}
              ref={addToCardsRef}
              className="bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-lg p-5 flex flex-col h-full transform transition duration-500 hover:scale-105 hover:shadow-2xl backdrop-blur-sm relative z-10 overflow-hidden group"
            >
              {/* Shimmer hover effect */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="w-full h-full bg-gradient-to-r from-white/10 via-white/30 to-white/10 opacity-0 group-hover:opacity-20 transition duration-500 animate-[shimmer_2s_infinite]"></div>
              </div>

              <div className="w-full h-48 bg-gray-700 rounded-xl overflow-hidden mb-4 relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-xl transition duration-500 group-hover:scale-110"
                />
                <button
                  onClick={(e) => handleWishlistToggle(e, product)}
                  className={`absolute top-3 right-3 p-3 rounded-full transition transform hover:scale-110 ${
                    isInWishlist(product.id)
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-600 text-gray-300 hover:bg-red-500 hover:text-white'
                  }`}
                >
                  <FaHeart size={16} />
                </button>
              </div>

              <RouterLink to={`/product/kids/${product.id}`}>
                <h3 className="font-semibold text-white mb-1 line-clamp-2 hover:text-purple-400 transition">{product.name}</h3>
              </RouterLink>
              <p className="text-gray-100 text-sm mb-3 line-clamp-2">{product.description}</p>
              <p className="text-xl font-bold text-purple-400 mb-4">{product.price}</p>

              <button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition transform hover:scale-105"
              >
                <FaShoppingCart size={16} />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto py-12 px-6 text-center relative z-10">
        <h2 className="text-3xl font-bold text-gray-100 mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['Quality Fabrics', 'Trendy Designs', 'Fast Shipping'].map((title, i) => (
            <div
              key={i}
              ref={addToBenefitsRef}
              className="bg-gray-850 p-6 rounded-xl shadow-lg"
            >
              <h3 className="font-bold text-purple-400 mb-2">{title}</h3>
              <p className="text-gray-100">
                {title === 'Quality Fabrics'
                  ? 'Soft, safe & comfortable materials for your kids.'
                  : title === 'Trendy Designs'
                  ? 'Stay ahead with our modern and stylish clothing.'
                  : 'Quick delivery right to your doorstep.'}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section
        ref={newsletterRef}
        className="max-w-7xl mx-auto py-12 px-6 bg-gray-850 rounded-xl text-center my-12 shadow-lg relative z-10">
        <h2 className="text-3xl font-bold text-gray-100 mb-4">Subscribe for Updates</h2>
        <p className="text-gray-200 mb-6">Get notified about our latest arrivals and exclusive offers.</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-xl w-full md:w-1/3 text-gray-900"
          />
          <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition">
            Subscribe
          </button>
        </div>
      </section>
    </div>
  );
};

export default KidsPage;
