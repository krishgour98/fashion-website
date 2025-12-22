import React, { useState, useEffect, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaStar, FaQuoteLeft, FaThumbsUp, FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { CartContext } from "../context/CartContext.jsx";
import { WishlistContext } from "../context/WishlistContext.jsx";
import { DarkModeContext } from "../context/DarkModeContext.jsx";
import ProductCard from "./ui/ProductCard";

const Home = () => {
  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useContext(WishlistContext);
  const { darkMode } = useContext(DarkModeContext);
  const [open, setOpen] = useState(null);
  const [helpful, setHelpful] = useState({});

  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  const handleHelpful = (reviewId) => {
    setHelpful({
      ...helpful,
      [reviewId]: !helpful[reviewId],
    });
  };

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

  const categories = [
    {
      name: "Men",
      color: "text-blue-700",
      hover: "hover:bg-blue-100",
      brands: ["Levi's", "Nike", "Adidas", "Raymond"],
    },
    {
      name: "Women",
      color: "text-pink-700",
      hover: "hover:bg-pink-100",
      brands: ["Zara", "H&M", "Forever 21", "Biba"],
    },
    {
      name: "Kids",
      color: "text-green-700",
      hover: "hover:bg-green-100",
      brands: ["Carter's", "Mothercare", "Gini & Jony", "UCB Kids"],
    },
    {
      name: "Accessories",
      color: "text-yellow-700",
      hover: "hover:bg-yellow-100",
      brands: ["Fossil", "Ray-Ban", "Michael Kors", "Aldo"],
    },
  ];
const offer = {
  title: "Limited Time Deal",
  description: "Enjoy massive savings on select fashion and lifestyle products. Hurry, offer ends soon!",
  discount: "50% Off"
};

  // Countdown: set an offer end time (48 hours from component mount)
  const OFFER_END = new Date(Date.now() + 48 * 60 * 60 * 1000) 

  const [timeLeft, setTimeLeft] = useState(() => {
    const diff = OFFER_END - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
    const minutes = Math.floor((diff / (1000 * 60)) % 60)
    const seconds = Math.floor((diff / 1000) % 60)
    return { days, hours, minutes, seconds }
  })

  useEffect(() => {
    const tick = () => {
      const diff = OFFER_END - Date.now()
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
      const seconds = Math.floor((diff / 1000) % 60)
      setTimeLeft({ days, hours, minutes, seconds })
    }

    const id = setInterval(tick, 1000)
    // run immediately to avoid 1s delay
    tick()
    return () => clearInterval(id)
  }, [])

  const categoryCards = [
    {
      name: "Men",
      img: "https://th.bing.com/th/id/OIP.9OUVyCQZqO8uepUuhuPtoAHaHU?w=208&h=206&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    },
    {
      name: "Women",
      img: "https://th.bing.com/th/id/OIP.9V5aqdqsQwAE_XwJkdARkQAAAA?w=204&h=306&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      name: "Kids",
      img: "https://th.bing.com/th/id/OIP.deaLx3SHVFalQfTOm4SwgQHaIj?w=208&h=240&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    },
    {
      name: "Accessories",
      img: "https://th.bing.com/th/id/OIP.2qdZvuk3zfT-aV-Ah3OklAHaHa?w=173&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Rahul Sharma",
      avatar: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      title: "Amazing Quality & Fast Delivery!",
      review: "The quality of clothes is exceptional. Delivery was super fast and packaging was perfect. Will definitely shop again!",
      helpful: 245,
      verified: true,
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Priya Singh",
      avatar: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      title: "Best Collection Ever",
      review: "Love the variety of brands available. The prices are reasonable and the website is very user-friendly. Highly recommended!",
      helpful: 189,
      verified: true,
      date: "1 week ago"
    },
    {
      id: 3,
      name: "Amit Kumar",
      avatar: "https://i.pravatar.cc/150?img=3",
      rating: 4,
      title: "Great Products, Minor Issue",
      review: "Most items were great quality. One shirt had a small issue with stitching but customer service helped resolve it quickly.",
      helpful: 156,
      verified: true,
      date: "3 days ago"
    },
    {
      id: 4,
      name: "Neha Patel",
      avatar: "https://i.pravatar.cc/150?img=9",
      rating: 5,
      title: "Perfect Fit & Great Style",
      review: "The sizing guide was accurate and the fit is perfect. The style and comfort are amazing. Love the seasonal collection!",
      helpful: 234,
      verified: true,
      date: "5 days ago"
    },
    {
      id: 5,
      name: "Vikram Desai",
      avatar: "https://i.pravatar.cc/150?img=12",
      rating: 4,
      title: "Good Value for Money",
      review: "Decent quality products at reasonable prices. Some items took a bit longer to arrive but the overall experience was positive.",
      helpful: 178,
      verified: true,
      date: "1 week ago"
    },
    {
      id: 6,
      name: "Anjali Verma",
      avatar: "https://i.pravatar.cc/150?img=20",
      rating: 5,
      title: "Exceeded My Expectations!",
      review: "Fantastic shopping experience! The app is smooth, checkout is easy, and the return policy is customer-friendly. Kudos!",
      helpful: 312,
      verified: true,
      date: "4 days ago"
    }
  ];

  const womenItems = [
    { id: 'women-1', name: 'Top', image: 'https://th.bing.com/th/id/OIP.l1fBF3Ab9FVplBYByq_UnwHaLH?w=204&h=306&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', price: '₹499' },
    { id: 'women-2', name: 'Dresses', image: 'https://th.bing.com/th/id/OIP.Cc15jw19kYIRrZqbOXuObwHaJ4?w=208&h=277&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', price: '₹899' },
    { id: 'women-3', name: 'Bottoms', image: 'https://th.bing.com/th/id/OIP.Qm_4srH5HbSCIZ43BlqbVgHaJ4?w=208&h=277&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', price: '₹699' },
    { id: 'women-4', name: 'Ethnic Wear', image: 'https://th.bing.com/th/id/OIP.mSqYDbwiapgSuzf6KGMY5gHaJ4?w=208&h=277&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', price: '₹1299' },
    { id: 'women-5', name: 'Sleeves Top', image: 'https://th.bing.com/th/id/OIP.JYNy0qF8uFi4cLrM9f3W5AHaJo?w=208&h=271&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', price: '₹399' },
  ];

  const menItems = [
    { id: 'men-1', name: 'Shirts', image: 'https://th.bing.com/th/id/OIP.GEebChQkP-Vo3jNeqyK-XgHaHa?w=208&h=208&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', price: '₹599' },
    { id: 'men-2', name: 'Jeans', image: 'https://th.bing.com/th/id/OIP.mjv8kdRd7Q2hrc8vbzywwAHaJ4?w=208&h=277&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', price: '₹1299' },
    { id: 'men-3', name: 'Jackets', image: 'https://th.bing.com/th/id/OIP.9c7qLgDo7sqwJOwLcTQcJAHaIt?w=208&h=245&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', price: '₹1999' },
    { id: 'men-4', name: 'Footwear', image: 'https://th.bing.com/th/id/OIP.UchxZDMzibIgJPMhnvIvagHaHa?w=209&h=209&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', price: '₹799' },
    { id: 'men-5', name: 'T-shirt', image: 'https://th.bing.com/th/id/OIP.V3F0LkcWgCSh4FRJrawxkwHaJ4?w=208&h=277&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3', price: '₹349' },
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            size={16}
            className={i < rating ? "text-yellow-400" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Modern Hero Section */}
      <section className="relative w-full min-h-[500px] flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-30 dark:opacity-20"></div>
        {/* explicit dark overlay to ensure hero darkens when darkMode toggled */}
        {darkMode && <div className="absolute inset-0 bg-black/60 pointer-events-none transition-opacity" />}
        <div className="relative z-10 max-w-3xl mx-auto text-center p-8 rounded-3xl bg-white/70 dark:bg-gray-900/70 shadow-2xl backdrop-blur-md animate-fadeIn">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 mb-4 drop-shadow-lg">FASHION FORWARD</h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-8 font-medium">Upgrade your style with the latest trends, premium brands, and exclusive deals. Shop the best for Men, Women, Kids & Accessories.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#categories" className="px-8 py-3 rounded-full text-lg font-bold text-white bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg hover:scale-105 hover:shadow-2xl transition">Shop Now</a>
            <a href="#brands" className="px-8 py-3 rounded-full text-lg font-bold text-purple-700 dark:text-purple-300 bg-white/80 dark:bg-gray-800/80 border border-purple-300 dark:border-purple-700 shadow hover:bg-purple-50 dark:hover:bg-purple-900 hover:scale-105 transition">Explore Brands</a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent pointer-events-none"></div>
      </section>

      {/* Shop by Category */}
<div id="categories" className="w-full px-6 py-12 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
 <h3 className="font-bold text-3xl text-center mb-10 block mx-auto 
  relative after:content-[''] after:block after:w-16 after:h-[3px] 
  after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 
  after:mx-auto after:mt-2">
  Shop by Category
</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
    {categoryCards.map((cat, i) => (
      <div
        key={i}
        className="relative p-6 rounded-2xl shadow-xl bg-white/80 dark:bg-gray-900/80 cursor-pointer hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 group overflow-hidden border border-purple-100 dark:border-purple-900 backdrop-blur-md animate-fadeIn"
        style={{ animationDelay: `${i * 0.1}s` }}
      >
        <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-pink-400/30 to-purple-400/20 rounded-full blur-2xl z-0"></div>
        <div className="w-32 h-32 mx-auto mb-4 rounded-full border-4 border-purple-200 dark:border-purple-700 overflow-hidden group-hover:border-pink-400 transition relative z-10">
          <img
            src={cat.img}
            alt={cat.name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
        </div>
        <div className="font-extrabold text-2xl text-gray-700 dark:text-gray-100 group-hover:text-purple-600 dark:group-hover:text-pink-400 transition relative z-10">
          {cat.name}
        </div>
        <span className="absolute top-4 left-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10 animate-pulse">Hot</span>
      </div>
    ))}
  </div>
</div>

{/* another section */}
      <div className="w-full px-6 py-12 bg-white">
        <h3 className="font-bold text-3xl text-center mb-10 relative inline-block mx-auto after:content-[''] after:block after:w-16 after:h-[3px] after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 after:mx-auto after:mt-2">
          Shop by Brands
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300">
              {/* Category Header */}
              <div
                className={`font-bold text-xl mb-4 cursor-pointer flex justify-between items-center border-b pb-2 ${cat.color}`}
                onClick={() => toggle(index)} >
                {cat.name}
                <span className="text-gray-500">
                  {open === index ? "−" : "+"}
                </span>
              </div>

              {/* Brands List (Show only when open) */}
              <div
                className={`transition-all duration-500 overflow-hidden ${
                  open === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`} >
                <div className="space-y-3 mt-3">
                  {cat.brands.map((brand, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-lg bg-white border ${cat.hover} hover:scale-105 transition cursor-pointer`} >
                      {brand}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* women another section  */}
      <section className="w-full bg-gradient-to-r from-gray-600 to-gray-300 p-6 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-extrabold text-2xl text-purple-600 dark:text-pink-300">Popular In Women</h2>
            <a href="/women" className="text-sm text-gray-700 dark:text-gray-300">See all women&apos;s</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {womenItems.map((it) => (
              <ProductCard
                key={it.id}
                product={it}
                onAdd={handleAddToCart}
                onWishlist={handleWishlistToggle}
                isWish={isInWishlist(it.id)}
                link={`/women/${it.id}`}
              />
            ))}
          </div>
        </div>
      </section>
             
    {/*  men another section  */}
      <section className="w-full bg-gradient-to-r from-gray-600 to-indigo-400 p-6 mt-10 dark:from-gray-900 dark:to-indigo-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-extrabold text-black dark:text-white">Popular In Men</h3>
            <a href="/men" className="text-sm text-gray-700 dark:text-gray-300">See all men's</a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {menItems.map((it) => (
              <ProductCard
                key={it.id}
                product={it}
                onAdd={handleAddToCart}
                onWishlist={handleWishlistToggle}
                isWish={isInWishlist(it.id)}
                link={`/men/${it.id}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Another section discount */}
     <div className="w-full mt-4 bg-gradient-to-r from-emerald-400 to-slate-800 text-center h-auto">
     <div className="p-4 md:p-8 flex flex-col items-center space-y-3">
        <h3 className="text-white text-2xl font-bold">{offer.title}</h3>
        <p className="text-white text-xl">{offer.description}</p>

        {/* Timer display */}
        <div className="mt-3 flex items-center gap-3 text-white font-mono">
          {timeLeft.days + timeLeft.hours + timeLeft.minutes + timeLeft.seconds > 0 ? (
            <>
              <div className="px-3 py-2 bg-black bg-opacity-30 rounded">
                <div className="text-sm">{String(timeLeft.days).padStart(2, '0')}</div>
                <div className="text-xs">Days</div>
              </div>
              <div className="px-3 py-2 bg-black bg-opacity-30 rounded">
                <div className="text-sm">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-xs">Hrs</div>
              </div>
              <div className="px-3 py-2 bg-black bg-opacity-30 rounded">
                <div className="text-sm">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-xs">Min</div>
              </div>
              <div className="px-3 py-2 bg-black bg-opacity-30 rounded">
                <div className="text-sm">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="text-xs">Sec</div>
              </div>
            </>
          ) : (
            <div className="text-white font-semibold">Offer ended</div>
          )}
        </div>

    <button className="font-bold text-xl text-white  bg-gray-800 hover:bg-blue-600 px-4 py-2 rounded-md transition duration-300">
            {offer.discount}
    </button>
  </div>
</div>

    {/* Combo Deals -> Stylish Product Cards */}
  <section className="w-full mt-8 px-6 py-10 bg-gradient-to-r from-green-100 via-teal-50 to-cyan-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-extrabold text-3xl text-gray-800 dark:text-gray-100">Combo Deals</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">Limited time bundles — save more on curated sets</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[{
          title: 'Summer Combo',
          desc: 'T-shirt + Shorts + Cap',
          price: '₹999',
          save: 'Save 30%',
          img: 'https://cdn.pixabay.com/photo/2024/04/29/04/21/tshirt-8726716_1280.jpg',
          img1:'https://th.bing.com/th/id/OIP.jZbnFDaZ3ca9IofgapCvrAAAAA?w=208&h=277&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1',
          img2:'https://th.bing.com/th/id/OIP.HrILGqpSX3aU_nZMBJyAqgHaHa?w=245&h=184&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1',

        },{
          title: 'Winter Combo',
          desc: 'Muffler + Jacket + Cap',
          price: '₹1,299',
          save: 'Save 25%',
          img: 'https://th.bing.com/th/id/OIP.7x3GLxRllKr25pIac1t5_gHaJ4?w=208&h=277&c=7&r=0&o=7&cb=ucfimg2&dpr=1.3&pid=1.7&rm=3&ucfimg=1',
          img1:'',
          img2:'',
        },{
          title: 'Festive Pack',
          desc: 'Kurta + Dupatta + Footwear',
          price: '₹1,799',
          save: 'Save 40%',
          img: 'https://static3.azafashions.com/uploads/product_gallery/dr-m20-azon-01-0706257001603950485.jpg',
          img1:'',
          img2:'',
        }].map((item, idx) => (
          <div key={idx} className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700 transform hover:-translate-y-2 transition duration-300">
            <div className="relative h-56">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow">{item.save}</div>
              <div className="absolute top-4 right-4 bg-white/80 dark:bg-gray-900/70 text-sm text-gray-800 dark:text-gray-200 px-2 py-1 rounded">Combo</div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{item.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{item.desc}</p>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-extrabold text-green-600 dark:text-green-400">{item.price}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">limited stock</div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:scale-105 transition">Add</button>
                  <button className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200">View</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>

    {/* Testimonials & Reviews Section -> Carousel */}
    <section className="w-full py-12 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-2">⭐ What People Are Saying</h2>
          <p className="text-gray-600 dark:text-gray-300">Real reviews from happy customers — trusted & verified</p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-center gap-8 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 dark:text-gray-100">4.8</div>
              <div className="flex justify-center mt-2">{renderStars(5)}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Based on 2,847 reviews</div>
            </div>
            <div className="w-px h-16 bg-gray-200 dark:bg-gray-700"></div>
            <div className="space-y-2 min-w-[220px] text-sm text-gray-600 dark:text-gray-300">
              {[5,4,3,2,1].map((s)=> (
                <div key={s} className="flex items-center gap-2">
                  <span className="w-10">{s}★</span>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2"><div className="bg-yellow-400 h-2 rounded-full" style={{width: s===5? '85%':'12%'}}></div></div>
                  <span className="w-12">{s===5?'85%':'12%'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Swiper for testimonials */}
        <div className="relative">
          <Swiper
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{ 640: { slidesPerView: 1 }, 1024: { slidesPerView: 2 } }}
            modules={[Autoplay, Navigation, Pagination]}
            className="py-6">
            {testimonials.map((review) => (
              <SwiperSlide key={review.id}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 h-full">
                  <div className="flex items-start gap-4 mb-3">
                    <img src={review.avatar} alt={review.name} className="w-14 h-14 rounded-full border-2 border-purple-200 dark:border-purple-700" />
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-gray-900 dark:text-gray-100">{review.name}</h3>
                        {review.verified && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">✓ Verified</span>}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{review.date}</div>
                    </div>
                  </div>
                  <div className="mb-3">{renderStars(review.rating)}</div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2"><FaQuoteLeft className="inline text-purple-400 mr-2"/>{review.title}</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{review.review}</p>
                  <div className="flex items-center justify-between">
                    <button onClick={() => handleHelpful(review.id)} className={`flex items-center gap-2 px-3 py-2 rounded-lg ${helpful[review.id] ? 'bg-purple-100 dark:bg-purple-900 text-purple-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}><FaThumbsUp size={14}/><span className="text-sm">{helpful[review.id] ? review.helpful + 1 : review.helpful}</span></button>
                    <button className="text-sm text-purple-600 dark:text-purple-400">Report</button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>

    </>
  );
};

export default Home;
