import React, { useState, useContext, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link, Element } from "react-scroll";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import { WishlistContext } from "../context/WishlistContext.jsx";
import { DarkModeContext } from "../context/DarkModeContext.jsx";
import ProductCard from "../Components/ui/ProductCard";
import { FaShoppingCart, FaHeart, FaStar, FaFire, FaTrophy } from "react-icons/fa";
import { menProducts } from '../data/categoryProducts';
import { brands } from '../data/brands';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MenPage = () => {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const { darkMode } = useContext(DarkModeContext);
  const [showMore, setShowMore] = useState(false);

  const visibleProducts = showMore ? menProducts : menProducts.slice(0, 8);
  const bestSellers = menProducts.slice(2, 7);
  const newArrivals = menProducts.slice(5, 10);
  const trendingProducts = menProducts.slice(0, 5);

  const handleAddToCart = (product) => {
    addToCart(product);
    alert(`✅ ${product.name} added to cart!`);
  };

  const handleWishlistToggle = (product) => {
    if (isInWishlist(product.id)) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  // GSAP animation refs
  const brandsRef = useRef(null);
  const trendingRef = useRef(null);
  const bestSellersRef = useRef(null);
  const newArrivalsRef = useRef(null);

  useEffect(() => {
    // Brands carousel animation
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

    return () => {
      gsap.killTweensOf([brandsRef.current?.children, trendingRef.current?.children, bestSellersRef.current?.children, newArrivalsRef.current?.children]);
    };
  }, []);

  return (
    <div className={`min-h-screen transition ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Sticky Navigation Buttons */}
      <div className={`sticky top-16 z-40 ${darkMode ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-lg shadow-lg border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
        <div className="max-w-7xl mx-auto flex gap-3 p-4 flex-wrap overflow-x-auto">
          <Link to="products" smooth duration={500} className={`px-5 py-2 rounded-lg cursor-pointer hover:scale-105 transition font-semibold text-sm whitespace-nowrap ${darkMode ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}>
            🛍️ Featured
          </Link>
          <Link to="bestsellers" smooth duration={500} className={`px-5 py-2 rounded-lg cursor-pointer hover:scale-105 transition font-semibold text-sm whitespace-nowrap ${darkMode ? 'bg-amber-600 text-white hover:bg-amber-700' : 'bg-amber-600 text-white hover:bg-amber-700'}`}>
            🏆 Best Sellers
          </Link>
          <Link to="new" smooth duration={500} className={`px-5 py-2 rounded-lg cursor-pointer hover:scale-105 transition font-semibold text-sm whitespace-nowrap ${darkMode ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-green-600 text-white hover:bg-green-700'}`}>
            ✨ New Arrivals
          </Link>
          <Link to="brands" smooth duration={500} className={`px-5 py-2 rounded-lg cursor-pointer hover:scale-105 transition font-semibold text-sm whitespace-nowrap ${darkMode ? 'bg-pink-600 text-white hover:bg-pink-700' : 'bg-pink-600 text-white hover:bg-pink-700'}`}>
            🏷️ Brands
          </Link>
          <Link to="trending" smooth duration={500} className={`px-5 py-2 rounded-lg cursor-pointer hover:scale-105 transition font-semibold text-sm whitespace-nowrap ${darkMode ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-600 text-white hover:bg-red-700'}`}>
            🔥 Trending
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className={`relative overflow-hidden py-16 px-4 ${darkMode ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600'} text-white`}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        </div>
        <div className="relative max-w-7xl mx-auto text-center z-10">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-purple-200">👔 Men's Premium Collection</h1>
          <p className="text-xl md:text-2xl text-white/90 mb-3 font-light">Discover timeless fashion & contemporary style for the modern gentleman</p>
          <p className="text-white/75">Premium fabrics • Perfect fit • Unbeatable prices</p>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <Element name="products">
        <section className={`max-w-7xl mx-auto px-4 py-16 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="mb-12">
            <h2 className={`text-5xl font-extrabold mb-4 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              ⭐ Featured Products
            </h2>
            <div className="h-1 w-32 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAdd={handleAddToCart}
                onWishlist={handleWishlistToggle}
                isWish={isInWishlist(product.id)}
                link={`/product/men/${product.id}`}
              />
            ))}
          </div>

          {!showMore && (
            <div className="flex justify-center mt-12">
              <button
                onClick={() => setShowMore(true)}
                className="px-10 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full hover:shadow-2xl hover:scale-105 transition font-semibold text-lg"
              >
                Explore All Products
              </button>
            </div>
          )}
        </section>
      </Element>

      {/* BEST SELLERS SECTION */}
      <Element name="bestsellers">
        <section className={`py-16 px-4 ${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-amber-50 to-gray-100'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className={`text-5xl font-extrabold mb-4 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <FaTrophy className="text-amber-500" /> Best Sellers
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-amber-600 to-orange-600 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6" ref={bestSellersRef}>
              {bestSellers.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={handleAddToCart}
                  onWishlist={handleWishlistToggle}
                  isWish={isInWishlist(product.id)}
                  link={`/product/men/${product.id}`}
                />
              ))}
            </div>
          </div>
        </section>
      </Element>

      {/* NEW ARRIVALS SECTION */}
      <Element name="new">
        <section className={`py-16 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className={`text-5xl font-extrabold mb-4 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                ✨ New Arrivals
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6" ref={newArrivalsRef}>
              {newArrivals.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={handleAddToCart}
                  onWishlist={handleWishlistToggle}
                  isWish={isInWishlist(product.id)}
                  link={`/product/men/${product.id}`}
                />
              ))}
            </div>
          </div>
        </section>
      </Element>

      {/* BRANDS SECTION - Enhanced Carousel */}
      <Element name="brands">
        <section className={`py-16 px-4 ${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-white'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className={`text-5xl font-extrabold mb-4 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                🏷️ Top Brands
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-pink-600 to-rose-600 rounded-full"></div>
            </div>
            
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
              ref={brandsRef}
            >
              {brands.map((brand) => (
                <SwiperSlide key={brand.id}>
                  <RouterLink to={`/brand/${brand.id}`}>
                    <div
                      className={`rounded-2xl p-6 flex flex-col items-center cursor-pointer transition duration-300 transform hover:scale-110 hover:-translate-y-3 h-56 justify-center border-2 ${
                        darkMode
                          ? 'bg-gray-700/50 border-gray-600 hover:border-pink-500 hover:bg-gray-600/70'
                          : 'bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200 hover:border-pink-500 hover:bg-gradient-to-br hover:from-pink-100 hover:to-rose-100 shadow-lg hover:shadow-2xl'
                      }`}
                    >
                      <div className={`w-32 h-32 rounded-full p-2 mb-4 flex items-center justify-center border-4 ${darkMode ? 'border-pink-500/50 bg-gray-800' : 'border-pink-300 bg-white'} overflow-hidden shadow-lg`}>
                        <img src={brand.img} alt={brand.name} className="w-full h-full object-contain" />
                      </div>
                      <h4 className={`text-lg font-bold text-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>{brand.name}</h4>
                      <div className="mt-3 text-xs px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold">
                        Shop Now
                      </div>
                    </div>
                  </RouterLink>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </Element>

      {/* TRENDING SECTION */}
      <Element name="trending">
        <section className={`py-16 px-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className={`text-5xl font-extrabold mb-4 flex items-center gap-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <FaFire className="text-red-500 animate-bounce" /> Trending Now
              </h2>
              <div className="h-1 w-32 bg-gradient-to-r from-red-600 to-orange-600 rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6" ref={trendingRef}>
              {trendingProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAdd={handleAddToCart}
                  onWishlist={handleWishlistToggle}
                  isWish={isInWishlist(product.id)}
                  link={`/product/men/${product.id}`}
                />
              ))}
            </div>
          </div>
        </section>
      </Element>

      {/* PROMO/SPECIAL OFFERS SECTION */}
      <section className={`py-16 px-4 ${darkMode ? 'bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900' : 'bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600'} text-white`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-extrabold mb-4">🎉 Limited Time Offers</h2>
            <p className="text-xl text-white/90">Grab amazing deals on your favorite styles</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`rounded-2xl p-8 backdrop-blur-md border-2 border-white/20 hover:border-white/50 transition transform hover:scale-105 ${darkMode ? 'bg-white/5' : 'bg-white/10'}`}>
              <div className="text-5xl font-extrabold mb-3 bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">30%</div>
              <p className="text-xl font-semibold mb-2">Casual Wear</p>
              <p className="text-white/80 text-sm">T-shirts, Polos & More</p>
            </div>
            <div className={`rounded-2xl p-8 backdrop-blur-md border-2 border-white/20 hover:border-white/50 transition transform hover:scale-105 ${darkMode ? 'bg-white/5' : 'bg-white/10'}`}>
              <div className="text-5xl font-extrabold mb-3 bg-gradient-to-r from-red-300 to-pink-300 bg-clip-text text-transparent">40%</div>
              <p className="text-xl font-semibold mb-2">Formal Wear</p>
              <p className="text-white/80 text-sm">Shirts, Blazers & Suits</p>
            </div>
            <div className={`rounded-2xl p-8 backdrop-blur-md border-2 border-white/20 hover:border-white/50 transition transform hover:scale-105 ${darkMode ? 'bg-white/5' : 'bg-white/10'}`}>
              <div className="text-5xl font-extrabold mb-3 bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">50%</div>
              <p className="text-xl font-semibold mb-2">Footwear</p>
              <p className="text-white/80 text-sm">Shoes & Sneakers</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-white/80 text-lg mb-4">⏰ Offer ends in 48 hours!</p>
            <button className="px-10 py-4 bg-white text-purple-600 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition">
              Shop Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenPage;
