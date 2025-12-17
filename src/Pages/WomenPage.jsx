import React, { useState, useContext, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link, Element } from 'react-scroll';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';
import { WishlistContext } from '../context/WishlistContext.jsx';
import { DarkModeContext } from '../context/DarkModeContext.jsx';
import ProductCard from '../Components/ui/ProductCard';
import { womenProducts } from '../data/categoryProducts';
import { brands } from '../data/brands';
import { FaFire, FaTrophy, FaStar, FaShoppingBag, FaArrowRight } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WomenPage = () => {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const { darkMode } = useContext(DarkModeContext);
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const visibleProducts = showMore ? womenProducts : womenProducts.slice(0, 8);
  const bestSellers = womenProducts.slice(2, 7);
  const newArrivals = womenProducts.slice(5, 10);
  const trendingProducts = womenProducts.slice(0, 5);

  // Filter products by category
  const casualProducts = womenProducts.filter(p => 
    p.name.toLowerCase().includes('t-shirt') || 
    p.name.toLowerCase().includes('dress') || 
    p.name.toLowerCase().includes('crop') ||
    p.name.toLowerCase().includes('denim jacket')
  );
  
  const formalProducts = womenProducts.filter(p => 
    p.name.toLowerCase().includes('blazer') || 
    p.name.toLowerCase().includes('saree') ||
    p.name.toLowerCase().includes('kurti') ||
    p.name.toLowerCase().includes('cargo')
  );
  
  const ethnicProducts = womenProducts.filter(p => 
    p.name.toLowerCase().includes('hoodie') || 
    p.name.toLowerCase().includes('sweater') ||
    p.name.toLowerCase().includes('leggings') ||
    p.name.toLowerCase().includes('jacket')
  );
  
  const sportProducts = womenProducts.filter(p => 
    p.name.toLowerCase().includes('leggings') || 
    p.name.toLowerCase().includes('cargo') ||
    p.name.toLowerCase().includes('sweater') ||
    p.name.toLowerCase().includes('hoodie')
  );

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigate(`/women?category=${category}`);
  };

  const productsRef = useRef(null);
  const bestSellersRef = useRef(null);
  const newArrivalsRef = useRef(null);
  const trendingRef = useRef(null);
  const brandsRef = useRef(null);

  useEffect(() => {
    // Products animation
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
          scrollTrigger: {
            trigger: productsRef.current,
            start: 'top 85%',
            once: false,
          },
        }
      );
    }

    // Best sellers animation
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
          scrollTrigger: {
            trigger: bestSellersRef.current,
            start: 'top 85%',
            once: false,
          },
        }
      );
    }

    // New arrivals animation
    if (newArrivalsRef.current?.children) {
      gsap.fromTo(
        newArrivalsRef.current.children,
        { opacity: 0, x: 40, scale: 0.9 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: newArrivalsRef.current,
            start: 'top 85%',
            once: false,
          },
        }
      );
    }

    // Trending animation
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
          scrollTrigger: {
            trigger: trendingRef.current,
            start: 'top 85%',
            once: false,
          },
        }
      );
    }

    // Brands animation
    if (brandsRef.current?.children) {
      gsap.fromTo(
        brandsRef.current.children,
        { opacity: 0, scale: 0.8, rotationY: -20 },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: brandsRef.current,
            start: 'top 85%',
            once: false,
          },
        }
      );
    }

    return () => {
      gsap.killTweensOf([
        productsRef.current?.children,
        bestSellersRef.current?.children,
        newArrivalsRef.current?.children,
        trendingRef.current?.children,
        brandsRef.current?.children,
      ]);
    };
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
    <div className={`min-h-screen transition ${darkMode ? 'bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950' : 'bg-gradient-to-b from-gray-50 via-pink-50 to-gray-100'}`}>
      {/* Sticky Navigation */}
      <div className={`sticky top-16 z-40 ${darkMode ? 'bg-gray-900/95 border-gray-700/50 shadow-2xl shadow-black/50' : 'bg-white/95 border-gray-100 shadow-xl'} backdrop-blur-2xl border-b transition`}>
        <div className="max-w-7xl mx-auto flex gap-3 p-4 flex-wrap overflow-x-auto">
          <Link to="products" smooth duration={500} className={`px-5 py-2 rounded-lg cursor-pointer hover:scale-105 transition font-semibold text-sm whitespace-nowrap ${darkMode ? 'bg-pink-600 text-white hover:bg-pink-700' : 'bg-pink-600 text-white hover:bg-pink-700'}`}>
            🛍️ Featured
          </Link>
          <Link to="bestsellers" smooth duration={500} className={`px-5 py-2 rounded-lg cursor-pointer hover:scale-105 transition font-semibold text-sm whitespace-nowrap ${darkMode ? 'bg-rose-600 text-white hover:bg-rose-700' : 'bg-rose-600 text-white hover:bg-rose-700'}`}>
            🏆 Best Sellers
          </Link>
          <Link to="new" smooth duration={500} className={`px-5 py-2 rounded-lg cursor-pointer hover:scale-105 transition font-semibold text-sm whitespace-nowrap ${darkMode ? 'bg-fuchsia-600 text-white hover:bg-fuchsia-700' : 'bg-fuchsia-600 text-white hover:bg-fuchsia-700'}`}>
            ✨ New Arrivals
          </Link>
          <Link to="brands" smooth duration={500} className={`px-5 py-2 rounded-lg cursor-pointer hover:scale-105 transition font-semibold text-sm whitespace-nowrap ${darkMode ? 'bg-purple-600 text-white hover:bg-purple-700' : 'bg-purple-600 text-white hover:bg-purple-700'}`}>
            🏷️ Brands
          </Link>
          <Link to="trending" smooth duration={500} className={`px-5 py-2 rounded-lg cursor-pointer hover:scale-105 transition font-semibold text-sm whitespace-nowrap ${darkMode ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-600 text-white hover:bg-red-700'}`}>
            🔥 Trending
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className={`relative overflow-hidden py-20 px-4 ${darkMode ? 'bg-gradient-to-r from-gray-950 via-pink-950 via-gray-950 to-gray-950' : 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600'} text-white`}>
        <div className="absolute inset-0 opacity-30">
          <div className={`absolute top-10 right-10 w-80 h-80 ${darkMode ? 'bg-pink-600/40' : 'bg-pink-400'} rounded-full blur-3xl animate-pulse`}></div>
          <div className={`absolute bottom-10 left-10 w-96 h-96 ${darkMode ? 'bg-rose-600/40' : 'bg-rose-400'} rounded-full blur-3xl animate-pulse`} style={{animationDelay: '1.5s'}}></div>
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 ${darkMode ? 'bg-purple-600/30' : 'bg-purple-400'} rounded-full blur-3xl animate-pulse`} style={{animationDelay: '3s'}}></div>
        </div>
        <div className="relative max-w-7xl mx-auto text-center z-10">
          <h1 className={`text-6xl md:text-7xl font-extrabold mb-4 ${darkMode ? 'bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-rose-300 to-pink-300' : 'bg-clip-text text-transparent bg-gradient-to-r from-pink-200 to-rose-200'}`}>👗 Women's Exclusive Collection</h1>
          <p className={`text-xl md:text-2xl ${darkMode ? 'text-rose-100' : 'text-white/90'} mb-3 font-light`}>Explore timeless elegance & contemporary fashion</p>
          <p className={darkMode ? 'text-rose-100/80' : 'text-white/75'}>Premium quality • Stylish designs • Affordable prices</p>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <Element name="products">
        <section className={`max-w-7xl mx-auto px-4 py-16 ${darkMode ? 'bg-gradient-to-b from-gray-900 to-gray-950' : 'bg-gradient-to-b from-gray-50 to-white'}`}>
          <div className="mb-12">
            <h2 className={`text-5xl font-extrabold mb-4 flex items-center gap-3 ${darkMode ? 'text-white drop-shadow-lg' : 'text-gray-900'}`}>
              ⭐ Featured Products
            </h2>
            <div className={`h-1 w-32 rounded-full ${darkMode ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500 shadow-lg shadow-pink-500/50' : 'bg-gradient-to-r from-pink-600 to-rose-600'}`}></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" ref={productsRef}>
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={handleAddToCart}
                onWishlist={handleWishlistToggle}
                isWish={isInWishlist(product.id)}
                link={`/product/women/${product.id}`}
              />
            ))}
          </div>

          {!showMore && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setShowMore(true)}
                className={`px-10 py-4 rounded-full font-semibold text-lg transition hover:shadow-2xl hover:scale-105 ${darkMode ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white hover:shadow-pink-500/50' : 'bg-gradient-to-r from-pink-600 to-rose-600 text-white'}`}
              >
                Explore All Products
              </button>
            </div>
          )}
        </section>
      </Element>

      {/* BEST SELLERS SECTION */}
      <Element name="bestsellers">
        <section className={`py-16 px-4 ${darkMode ? 'bg-gradient-to-r from-gray-900 via-rose-900/30 to-gray-900' : 'bg-gradient-to-r from-rose-50 to-gray-100'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className={`text-5xl font-extrabold mb-4 flex items-center gap-3 ${darkMode ? 'text-white drop-shadow-lg' : 'text-gray-900'}`}>
                <FaTrophy className={darkMode ? 'text-amber-400 drop-shadow-lg' : 'text-amber-500'} /> Best Sellers
              </h2>
              <div className={`h-1 w-32 rounded-full ${darkMode ? 'bg-gradient-to-r from-rose-500 via-orange-500 to-yellow-500 shadow-lg shadow-rose-500/50' : 'bg-gradient-to-r from-rose-600 to-orange-600'}`}></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6" ref={bestSellersRef}>
              {bestSellers.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={handleAddToCart}
                  onWishlist={handleWishlistToggle}
                  isWish={isInWishlist(product.id)}
                  link={`/product/women/${product.id}`}
                />
              ))}
            </div>
          </div>
        </section>
      </Element>

      {/* NEW ARRIVALS SECTION */}
      <Element name="new">
        <section className={`py-16 px-4 ${darkMode ? 'bg-gradient-to-r from-gray-950 via-purple-900/40 to-gray-950' : 'bg-gradient-to-r from-purple-50 to-pink-50'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className={`text-5xl font-extrabold mb-4 flex items-center gap-3 ${darkMode ? 'text-white drop-shadow-lg' : 'text-gray-900'}`}>
                ✨ New Arrivals
              </h2>
              <div className={`h-1 w-32 rounded-full ${darkMode ? 'bg-gradient-to-r from-fuchsia-500 via-purple-500 to-blue-500 shadow-lg shadow-fuchsia-500/50' : 'bg-gradient-to-r from-fuchsia-600 to-purple-600'}`}></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6" ref={newArrivalsRef}>
              {newArrivals.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={handleAddToCart}
                  onWishlist={handleWishlistToggle}
                  isWish={isInWishlist(product.id)}
                  link={`/product/women/${product.id}`}
                />
              ))}
            </div>
          </div>
        </section>
      </Element>

      {/* BRANDS SECTION - WOMEN'S CATEGORIES */}
      <Element name="brands">
        <section className={`py-16 px-4 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-indigo-900 to-gray-900' : 'bg-gradient-to-br from-pink-50 via-purple-50 to-pink-100'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className={`text-5xl font-extrabold mb-4 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                👗 Shop By Brands
              </h2>
              <div className="h-1 w-40 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-full"></div>
            </div>
            
            {/* Women's Popular Brands Carousel */}
            <div className="mb-16">
              <h3 className={`text-2xl font-bold mb-8 ${darkMode ? 'text-purple-300' : 'text-purple-700'}`}>🌟 Popular Brands</h3>
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                spaceBetween={20}
                slidesPerView={2}
                breakpoints={{
                  640: { slidesPerView: 3 },
                  768: { slidesPerView: 4 },
                  1024: { slidesPerView: 5 },
                }}
              >
                {brands.map((brand) => (
                  <SwiperSlide key={brand.id}>
                    <RouterLink to={`/brand/${brand.id}`}>
                      <div
                        className={`rounded-2xl p-6 flex flex-col items-center cursor-pointer transition duration-300 transform hover:scale-110 hover:-translate-y-3 h-56 justify-center border-2 ${
                          darkMode
                            ? 'bg-gradient-to-br from-gray-700 to-gray-800 border-purple-500/50 hover:border-purple-400 hover:bg-gradient-to-br hover:from-gray-600 hover:to-gray-700 shadow-xl'
                            : 'bg-gradient-to-br from-white to-purple-50 border-purple-300 hover:border-purple-500 hover:bg-gradient-to-br hover:from-purple-100 hover:to-pink-50 shadow-xl hover:shadow-2xl'
                        }`}
                      >
                        <div className={`w-32 h-32 rounded-full p-2 mb-4 flex items-center justify-center border-4 ${darkMode ? 'border-purple-400/70 bg-gray-800 shadow-lg shadow-purple-500/30' : 'border-purple-400 bg-white shadow-lg'} overflow-hidden`}>
                          <img src={brand.img} alt={brand.name} className="w-full h-full object-contain" />
                        </div>
                        <h4 className={`text-lg font-bold text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>{brand.name}</h4>
                        <div className={`mt-3 text-xs px-4 py-2 rounded-full font-semibold transition ${darkMode ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'}`}>
                          Explore
                        </div>
                      </div>
                    </RouterLink>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Women's Wear Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Casual Wear */}
              <button
                onClick={() => handleCategoryClick('casual')}
                className={`text-left rounded-3xl p-8 border-2 transition transform hover:scale-105 cursor-pointer w-full ${darkMode ? 'bg-gradient-to-br from-indigo-900/40 to-blue-900/30 border-indigo-500/50 hover:border-indigo-400 hover:shadow-xl shadow-lg' : 'bg-gradient-to-br from-blue-50 to-indigo-50 border-indigo-300 hover:border-indigo-500 hover:shadow-2xl shadow-lg'}`}
              >
                <div className="text-5xl mb-4">👕</div>
                <h3 className={`text-3xl font-bold mb-3 ${darkMode ? 'text-indigo-200' : 'text-indigo-900'}`}>Casual Wear</h3>
                <p className={`text-lg mb-6 ${darkMode ? 'text-indigo-100/80' : 'text-indigo-800'}`}>T-shirts, Polos, Casual Dresses</p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className={`px-4 py-2 rounded-lg text-sm font-semibold ${darkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-200 text-indigo-900'}`}>Cotton Tees</div>
                  <div className={`px-4 py-2 rounded-lg text-sm font-semibold ${darkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-200 text-indigo-900'}`}>Casual Dresses</div>
                  <div className={`px-4 py-2 rounded-lg text-sm font-semibold ${darkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-200 text-indigo-900'}`}>Polos</div>
                  <div className={`px-4 py-2 rounded-lg text-sm font-semibold ${darkMode ? 'bg-indigo-600 text-white' : 'bg-indigo-200 text-indigo-900'}`}>Skirts</div>
                </div>
                <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition hover:gap-3 ${darkMode ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white hover:shadow-lg hover:shadow-indigo-500/50' : 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:shadow-lg'}`}>
                  Shop Casual <FaArrowRight size={16} />
                </div>
              </button>

              {/* Formal Wear */}
              <button
                onClick={() => handleCategoryClick('formal')}
                className={`text-left rounded-3xl p-8 border-2 transition transform hover:scale-105 cursor-pointer w-full ${darkMode ? 'bg-gradient-to-br from-purple-900/40 to-pink-900/30 border-purple-500/50 hover:border-purple-400 hover:shadow-xl shadow-lg' : 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-300 hover:border-purple-500 hover:shadow-2xl shadow-lg'}`}
              >
                <div className="text-5xl mb-4">👗</div>
                <h3 className={`text-3xl font-bold mb-3 ${darkMode ? 'text-purple-200' : 'text-purple-900'}`}>Formal Wear</h3>
                <p className={`text-lg mb-6 ${darkMode ? 'text-purple-100/80' : 'text-purple-800'}`}>Office Wear, Sarees, Formal Dresses</p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className={`px-4 py-2 rounded-lg text-sm font-semibold ${darkMode ? 'bg-purple-600 text-white' : 'bg-purple-200 text-purple-900'}`}>Blazers</div>
                  <div className={`px-4 py-2 rounded-lg text-sm font-semibold ${darkMode ? 'bg-purple-600 text-white' : 'bg-purple-200 text-purple-900'}`}>Sarees</div>
                  <div className={`px-4 py-2 rounded-lg text-sm font-semibold ${darkMode ? 'bg-purple-600 text-white' : 'bg-purple-200 text-purple-900'}`}>Kurti</div>
                  <div className={`px-4 py-2 rounded-lg text-sm font-semibold ${darkMode ? 'bg-purple-600 text-white' : 'bg-purple-200 text-purple-900'}`}>Trousers</div>
                </div>
                <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition hover:gap-3 ${darkMode ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/50' : 'bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:shadow-lg'}`}>
                  Shop Formal <FaArrowRight size={16} />
                </div>
              </button>

              {/* Ethnic Wear */}
              <button
                onClick={() => handleCategoryClick('ethnic')}
                className={`text-left rounded-3xl p-8 border-2 transition transform hover:scale-105 cursor-pointer w-full ${darkMode ? 'bg-gradient-to-br from-orange-900/40 to-rose-900/30 border-orange-500/50 hover:border-orange-400 hover:shadow-xl shadow-lg' : 'bg-gradient-to-br from-orange-50 to-rose-50 border-orange-300 hover:border-orange-500 hover:shadow-2xl shadow-lg'}`}
              >
                <div className="text-5xl mb-4">🥻</div>
                <h3 className={`text-3xl font-bold mb-3 ${darkMode ? 'text-orange-200' : 'text-orange-900'}`}>Ethnic Wear</h3>
                <p className={`text-lg mb-6 ${darkMode ? 'text-orange-100/80' : 'text-orange-800'}`}>Lehengas, Anarkalis, Traditional</p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className={`px-4 py-2 rounded-lg text-sm font-semibold ${darkMode ? 'bg-orange-600 text-white' : 'bg-orange-200 text-orange-900'}`}>Lehenga</div>
                  <div className={`px-4 py-2 rounded-lg text-sm font-semibold ${darkMode ? 'bg-orange-600 text-white' : 'bg-orange-200 text-orange-900'}`}>Anarkali</div>
                  <div className={`px-4 py-2 rounded-lg text-sm font-semibold ${darkMode ? 'bg-orange-600 text-white' : 'bg-orange-200 text-orange-900'}`}>Dupatta</div>
                  <div className={`px-4 py-2 rounded-lg text-sm font-semibold ${darkMode ? 'bg-orange-600 text-white' : 'bg-orange-200 text-orange-900'}`}>Suit</div>
                </div>
                <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition hover:gap-3 ${darkMode ? 'bg-gradient-to-r from-orange-600 to-rose-600 text-white hover:shadow-lg hover:shadow-orange-500/50' : 'bg-gradient-to-r from-orange-500 to-rose-600 text-white hover:shadow-lg'}`}>
                  Shop Ethnic <FaArrowRight size={16} />
                </div>
              </button>

              {/* Sportswear */}
              <button
                onClick={() => handleCategoryClick('sport')}
                className={`text-left rounded-3xl p-8 border-2 transition transform hover:scale-105 cursor-pointer w-full ${darkMode ? 'bg-gradient-to-br from-teal-900/40 to-cyan-900/30 border-teal-500/50 hover:border-teal-400 hover:shadow-xl shadow-lg' : 'bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-300 hover:border-teal-500 hover:shadow-2xl shadow-lg'}`}
              >
                <div className="text-5xl mb-4">⛹️</div>
                <h3 className={`text-3xl font-bold mb-3 ${darkMode ? 'text-teal-200' : 'text-teal-900'}`}>Sportswear</h3>
                <p className={`text-lg mb-6 ${darkMode ? 'text-teal-100/80' : 'text-teal-800'}`}>Activewear, Gym, Running Wear</p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className={`px-4 py-2 rounded-lg text-sm font-semibold ${darkMode ? 'bg-teal-600 text-white' : 'bg-teal-200 text-teal-900'}`}>Gym Wear</div>
                  <div className={`px-4 py-2 rounded-lg text-sm font-semibold ${darkMode ? 'bg-teal-600 text-white' : 'bg-teal-200 text-teal-900'}`}>Yoga Wear</div>
                  <div className={`px-4 py-2 rounded-lg text-sm font-semibold ${darkMode ? 'bg-teal-600 text-white' : 'bg-teal-200 text-teal-900'}`}>Sports Bras</div>
                  <div className={`px-4 py-2 rounded-lg text-sm font-semibold ${darkMode ? 'bg-teal-600 text-white' : 'bg-teal-200 text-teal-900'}`}>Leggings</div>
                </div>
                <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition hover:gap-3 ${darkMode ? 'bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-teal-500/50' : 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:shadow-lg'}`}>
                  Shop Sports <FaArrowRight size={16} />
                </div>
              </button>
            </div>
          </div>
        </section>
      </Element>

      {/* TRENDING SECTION */}
      <Element name="trending">
        <section className={`py-16 px-4 ${darkMode ? 'bg-gradient-to-r from-gray-900 via-red-900/30 to-gray-900' : 'bg-gradient-to-r from-red-50 to-pink-100'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className={`text-5xl font-extrabold mb-4 flex items-center gap-3 ${darkMode ? 'text-white drop-shadow-lg' : 'text-gray-900'}`}>
                <FaFire className={`${darkMode ? 'text-red-400 drop-shadow-lg' : 'text-red-500'} animate-bounce`} /> Trending Now
              </h2>
              <div className={`h-1 w-32 rounded-full ${darkMode ? 'bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 shadow-lg shadow-red-500/50' : 'bg-gradient-to-r from-red-600 to-pink-600'}`}></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6" ref={trendingRef}>
              {trendingProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={handleAddToCart}
                  onWishlist={handleWishlistToggle}
                  isWish={isInWishlist(product.id)}
                  link={`/product/women/${product.id}`}
                />
              ))}
            </div>
          </div>
        </section>
      </Element>

      {/* SPECIAL OFFERS */}
      <section className={`py-20 px-4 ${darkMode ? 'bg-gradient-to-br from-pink-950 via-purple-950 to-pink-950 relative overflow-hidden' : 'bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600'} text-white`}>
        {darkMode && (
          <>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
            </div>
          </>
        )}
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-extrabold mb-4">💝 Limited Time Offers</h2>
            <p className={`text-xl ${darkMode ? 'text-rose-100' : 'text-white/90'}`}>Grab exclusive deals on your favorite styles</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`rounded-3xl p-10 backdrop-blur-xl border-2 transition transform hover:scale-105 ${darkMode ? 'bg-white/5 border-pink-500/30 hover:border-pink-400 hover:bg-white/10 shadow-2xl shadow-pink-500/20' : 'bg-white/10 border-white/20 hover:border-white/50 shadow-2xl'}`}>
              <div className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">35%</div>
              <p className="text-2xl font-bold mb-3">Summer Collection</p>
              <p className={`text-lg ${darkMode ? 'text-rose-100/80' : 'text-white/80'}`}>Dresses, Tops & Shorts</p>
            </div>
            <div className={`rounded-3xl p-10 backdrop-blur-xl border-2 transition transform hover:scale-105 ${darkMode ? 'bg-white/5 border-red-500/30 hover:border-red-400 hover:bg-white/10 shadow-2xl shadow-red-500/20' : 'bg-white/10 border-white/20 hover:border-white/50 shadow-2xl'}`}>
              <div className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-red-300 to-pink-300 bg-clip-text text-transparent">45%</div>
              <p className="text-2xl font-bold mb-3">Winter Wear</p>
              <p className={`text-lg ${darkMode ? 'text-rose-100/80' : 'text-white/80'}`}>Sweaters, Jackets & Coats</p>
            </div>
            <div className={`rounded-3xl p-10 backdrop-blur-xl border-2 transition transform hover:scale-105 ${darkMode ? 'bg-white/5 border-green-500/30 hover:border-green-400 hover:bg-white/10 shadow-2xl shadow-green-500/20' : 'bg-white/10 border-white/20 hover:border-white/50 shadow-2xl'}`}>
              <div className="text-6xl font-extrabold mb-4 bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">40%</div>
              <p className="text-2xl font-bold mb-3">Accessories</p>
              <p className={`text-lg ${darkMode ? 'text-rose-100/80' : 'text-white/80'}`}>Bags, Belts & Jewelry</p>
            </div>
          </div>

          <div className="text-center mt-16">
            <p className={`text-xl mb-6 font-semibold ${darkMode ? 'text-rose-100' : 'text-white'}`}>⏰ Offer ends in 48 hours!</p>
            <button className={`px-12 py-4 rounded-full font-bold text-lg transition transform hover:scale-105 ${darkMode ? 'bg-white text-pink-600 hover:shadow-2xl hover:shadow-white/30' : 'bg-white text-pink-600 hover:shadow-2xl'}`}>
              🛍️ Shop Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WomenPage;
