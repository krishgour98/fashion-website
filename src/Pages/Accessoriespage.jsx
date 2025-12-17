import React, { useContext, useEffect, useRef, useState } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import { WishlistContext } from '../context/WishlistContext.jsx';
import { DarkModeContext } from '../context/DarkModeContext.jsx';
import { FaShoppingCart, FaHeart, FaTrophy, FaArrowRight, FaStar,  } from 'react-icons/fa';
import { GiBackpack, GiMagicHat } from 'react-icons/gi';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProductCard from '../Components/ui/ProductCard';

gsap.registerPlugin(ScrollTrigger);

const accessoriesProducts = [
  { id: 601, name: 'Leather Wallet', category: 'Wallet', price: '₹999', image: 'https://th.bing.com/th/id/OIP.XYjwCi0UnTF9shcnXkDx6AHaEJ?w=328&h=184&c=7&r=0&o=7&cb=ucfimgc2&dpr=1.3&pid=1.7&rm=3', description: 'Premium leather wallet with RFID protection' },
  { id: 603, name: 'Wrist Watch', category: 'Watches', price: '₹2999', image: 'https://th.bing.com/th/id/OIP.mB31ITxVGsQVMht1CZfcOQHaHa?w=199&h=199&c=7&r=0&o=7&cb=ucfimgc2&dpr=1.3&pid=1.7&rm=3', description: 'Analog watch with leather strap' },
  { id: 604, name: 'Canvas Belt', category: 'Belt', price: '₹599', image: 'https://th.bing.com/th/id/OIP.p1shrmNarOD3-VxHLsk4hAHaHa?w=215&h=215&c=7&r=0&o=7&cb=ucfimgc2&dpr=1.3&pid=1.7&rm=3', description: 'Durable canvas belt with metal buckle' },
  { id: 605, name: 'Backpack', category: 'Backpack', price: '₹1999', image: 'https://th.bing.com/th/id/OIP.23tQYSG_OAou006p5hJBrAHaIj?w=175&h=202&c=7&r=0&o=7&cb=ucfimgc2&dpr=1.3&pid=1.7&rm=3', description: 'Water-resistant laptop backpack' },
  { id: 606, name: 'Crossbody Bag', category: 'Bag', price: '₹1299', image: 'https://m.media-amazon.com/images/I/71iSgXnbU8L._AC_SL1500_.jpg', description: 'Stylish crossbody bag for daily use' },
  { id: 607, name: 'Scarves Set', category: 'Scarf', price: '₹799', image: 'https://th.bing.com/th/id/OIP.pRyEpl1MpSZ6nNE_GPL-gAHaHa?w=219&h=219&c=7&r=0&o=7&cb=ucfimgc2&dpr=1.3&pid=1.7&rm=3', description: 'Colorful scarves set (3 pieces)' },
  { id: 608, name: 'Leather Gloves', category: 'Gloves', price: '₹1299', image: 'https://th.bing.com/th/id/OIP.aW6cjw0UfNAgIpKRfRqDgAHaKB?w=144&h=194&c=7&r=0&o=7&cb=ucfimgc2&dpr=1.3&pid=1.7&rm=3', description: 'Winter leather gloves for warmth' },
];

const categories = [
  { name: 'All', icon: <FaStar size={20} /> },
  { name: 'Backpack', icon: <GiBackpack size={24} /> },
  { name: 'Wallet', icon: <FaHeart size={24} /> },
  { name: 'Hats', icon: <GiMagicHat size={24} /> },
];

const AccessoriesPage = () => {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const { darkMode } = useContext(DarkModeContext);

  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const productsRef = useRef(null);
  const bestSellersRef = useRef(null);
  const newArrivalsRef = useRef(null);
  const particlesRef = useRef(null);

  const filteredProducts = selectedCategory === 'All'
    ? accessoriesProducts
    : accessoriesProducts.filter(p => p.category && p.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const displayedProducts = showAll ? filteredProducts : filteredProducts.slice(0, 6);
  const bestSellers = filteredProducts.slice(0, 5);
  const newArrivals = filteredProducts.slice(-5);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`✅ ${product.name} added to cart!`);
  };

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  // Floating Particles
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    const createParticle = () => {
      const particle = document.createElement('div');
      const size = Math.random() * 4 + 1;
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;

      particle.className = 'fixed pointer-events-none rounded-full';
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.background = darkMode
        ? `rgba(${Math.random()*100+155}, ${Math.random()*100+155}, 255, 0.7)`
        : `rgba(255, ${Math.random()*100+155}, 200, 0.5)`;
      particle.style.zIndex = '0';

      container.appendChild(particle);

      gsap.to(particle, {
        x: `+=${Math.random()*40-20}`,
        y: window.innerHeight + 50,
        opacity: 0,
        duration: Math.random() * 15 + 10,
        ease: 'linear',
        onComplete: () => particle.remove(),
      });
    };

    const interval = setInterval(createParticle, 300);
    for (let i=0;i<10;i++) createParticle();

    return () => clearInterval(interval);
  }, [darkMode]);

  // Scroll Animations
  useEffect(() => {
    [productsRef, bestSellersRef, newArrivalsRef].forEach(ref => {
      if (ref.current?.children) {
        gsap.fromTo(
          ref.current.children,
          { opacity: 0, y: 50, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: ref.current,
              start: 'top 85%',
              once: false,
            },
          }
        );
      }
    });
  }, []);

  return (
    <div className={`min-h-screen relative overflow-hidden ${darkMode ? 'bg-gray-900 text-white' : 'bg-yellow-50 text-gray-900'}`}>
      {/* Floating Particles */}
      <div ref={particlesRef} className="fixed inset-0 pointer-events-none z-0"></div>

      {/* Hero */}
      <section className={`relative py-20 px-6 z-10 ${darkMode ? 'bg-gradient-to-r from-blue-900 to-cyan-900 text-white' : 'bg-gradient-to-r from-yellow-400 to-yellow-200 text-gray-900'}`}>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-bounce">✨ Accessories Collection</h1>
          <p className="text-lg md:text-xl opacity-90">Stylish & safe accessories for your little ones</p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="max-w-7xl mx-auto px-6 py-12 relative z-20">
        <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Shop by Category</h2>
        <div className="flex flex-wrap gap-4">
          {categories.map((cat, i)=>(
            <button key={i} onClick={()=>setSelectedCategory(cat.name)} className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition ${selectedCategory===cat.name? 'bg-blue-500 text-white' : darkMode ? 'bg-gray-700 text-gray-100' : 'bg-gray-200 text-gray-800'}`}>
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 py-12 relative z-20">
        <h2 className={`text-3xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Featured Accessories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" ref={productsRef}>
          {displayedProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={handleAddToCart}
              onWishlist={handleWishlistToggle}
              isWish={isInWishlist(product.id)}
              link={`/product/accessories/${product.id}`}
            />
          ))}
        </div>
        {!showAll && filteredProducts.length>6 && <div className="flex justify-center mt-8">
          <button onClick={()=>setShowAll(true)} className={`px-8 py-4 rounded-full font-bold text-lg ${darkMode?'bg-cyan-600 text-white hover:shadow-lg hover:shadow-cyan-500/50':'bg-blue-500 text-white hover:shadow-lg hover:shadow-blue-400/50'} hover:scale-105 transition flex items-center gap-2`}>
            Explore More <FaArrowRight className="animate-bounce"/>
          </button>
        </div>}
        {showAll && <div className="flex justify-center mt-8">
          <button onClick={()=>setShowAll(false)} className={`px-8 py-4 rounded-full font-bold text-lg ${darkMode?'bg-gray-700 text-white':'bg-gray-300 text-gray-900'} hover:scale-105 transition flex items-center gap-2`}>
            Show Less <FaArrowRight className="rotate-180"/>
          </button>
        </div>}
      </section>

      {/* Best Sellers */}
      <section className="max-w-7xl mx-auto px-6 py-12 relative z-20">
        <h2 className={`text-3xl font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}><FaTrophy className="text-yellow-400"/> Best Sellers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6" ref={bestSellersRef}>
          {bestSellers.map(product=>(
            <ProductCard
              key={product.id}
              product={product}
              onAdd={handleAddToCart}
              onWishlist={handleWishlistToggle}
              isWish={isInWishlist(product.id)}
              link={`/product/accessories/${product.id}`}
            />
          ))}
        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-6 py-12 relative z-20">
        <h2 className={`text-3xl font-bold mb-6 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}><FaStar className="text-green-400"/> New Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6" ref={newArrivalsRef}>
          {newArrivals.map(product=>(
            <ProductCard
              key={product.id}
              product={product}
              onAdd={handleAddToCart}
              onWishlist={handleWishlistToggle}
              isWish={isInWishlist(product.id)}
              link={`/product/accessories/${product.id}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default AccessoriesPage;
