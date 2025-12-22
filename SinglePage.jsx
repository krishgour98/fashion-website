import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  menProducts,
  womenProducts,
  kidsProducts,
  accessoriesProducts,
} from "../data/categoryProducts";

import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { DarkModeContext } from "../context/DarkModeContext";

import ProductCard from "../Components/ui/ProductCard";
import {
  FaShoppingCart,
  FaHeart,
  FaStar,
  FaTruck,
  FaShieldAlt,
  FaUndo,
  FaShare,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaCheck,
} from "react-icons/fa";

// CATEGORY MAP
const CATEGORY_MAP = {
  men: menProducts,
  women: womenProducts,
  kids: kidsProducts,
  accessories: accessoriesProducts,
};

const SinglePage = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);
  const { addToWishlist, removeFromWishlist, isInWishlist } =
    useContext(WishlistContext);
  const { darkMode } = useContext(DarkModeContext);

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [showShare, setShowShare] = useState(false);

  // PRODUCTS
  const currentCategoryProducts = CATEGORY_MAP[category] || [];
  const product = currentCategoryProducts.find(
    (p) => String(p.id) === String(id)
  );

  // Product specs
  const productSpecs = [
    { icon: '🧵', title: 'Premium Material', value: '100% Quality Fabric' },
    { icon: '♻️', title: 'Eco-Friendly', value: 'Sustainable Source' },
    { icon: '⚡', title: 'Care Easy', value: 'Machine Wash' },
    { icon: '📏', title: 'Perfect Fit', value: 'Comfort Design' },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 800); // Shimmer for 0.8s
  }, [id, category]);

  // PRODUCT NOT FOUND
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl font-bold">
        Product Not Found 😓
      </div>
    );
  }

  // Setup default states
  useEffect(() => {
    setSelectedImage(product.images?.[0]);
    setSelectedColor(product.colors?.[0]);
    setSelectedSize(product.sizes?.[0]);
  }, [product]);

  // RELATED PRODUCTS
  const relatedProducts = currentCategoryProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 6);

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
      selectedColor,
      selectedSize,
    });
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  /* -------------------- SHIMMER LOADING -------------------- */
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="animate-pulse bg-gray-300 h-96 rounded-xl"></div>
        <div className="space-y-4">
          <div className="h-10 bg-gray-300 rounded w-1/2"></div>
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
          <div className="h-6 bg-gray-300 rounded w-full"></div>
          <div className="h-6 bg-gray-300 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-950 text-white' : 'bg-gray-50 text-gray-900'}`}>

      {/* Breadcrumb */}
      <div className={`${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-b px-4 py-3 sticky top-0 z-50 transition-colors`}>
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm">
          <button
            onClick={() => navigate(`/${category}`)}
            className="text-blue-600 font-semibold hover:text-blue-700"
          >
            {category.toUpperCase()}
          </button>
          <span>/</span>
          <span className="font-semibold">{product.name}</span>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className={`max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-10`}>

        {/* LEFT SIDE — IMAGE GALLERY */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          {/* Carousel Thumbnails */}
          <div className="flex gap-3 mb-4 overflow-x-scroll pb-2">
            {product.images?.map((img, idx) => (
              <motion.img
                key={idx}
                whileHover={{ scale: 1.05 }}
                src={img}
                onClick={() => setSelectedImage(img)}
                className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 transition-all flex-shrink-0
                  ${selectedImage === img
                    ? darkMode
                      ? 'border-purple-600 shadow-lg shadow-purple-600/50'
                      : 'border-blue-600 shadow-lg'
                    : darkMode
                    ? 'border-gray-700 hover:border-gray-600'
                    : 'border-gray-300 hover:border-gray-400'
                  }`}
              />
            ))}
          </div>

          {/* Main Image with Zoom */}
          <motion.div
            className={`overflow-hidden rounded-2xl shadow-2xl group relative h-96 ${
              darkMode
                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
                : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
            }`}
          >
            <motion.img
              key={selectedImage}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={selectedImage}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Stock Status */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/70 px-3 py-2 rounded-full backdrop-blur-sm">
              <FaCheck className="text-green-400" size={14} />
              <span className="text-white text-sm font-semibold">In Stock</span>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE — PRODUCT INFO */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="lg:sticky lg:top-20 h-fit">

          {/* Title & Rating & Share */}
          <div>
            <h1 className="text-4xl font-bold mb-3">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6 pb-6 border-b" style={{ borderColor: darkMode ? '#374151' : '#e5e7eb' }}>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.2 }}>
                    <FaStar size={16} className={i < 4 ? 'fill-current' : 'opacity-30'} />
                  </motion.div>
                ))}
              </div>
              <span className={`font-semibold text-lg`}>4.5</span>
              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>(245 verified reviews)</span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowShare(!showShare)}
                className={`ml-auto p-2 rounded-lg transition-all ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <FaShare size={18} />
              </motion.button>
            </div>

            {/* Share Buttons */}
            {showShare && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 flex gap-3"
              >
                <button className={`p-2 rounded-lg transition-all ${darkMode ? 'bg-blue-600/20 hover:bg-blue-600/40' : 'bg-blue-100 hover:bg-blue-200'}`}>
                  <FaFacebook size={16} className="text-blue-600" />
                </button>
                <button className={`p-2 rounded-lg transition-all ${darkMode ? 'bg-cyan-600/20 hover:bg-cyan-600/40' : 'bg-cyan-100 hover:bg-cyan-200'}`}>
                  <FaTwitter size={16} className="text-cyan-500" />
                </button>
                <button className={`p-2 rounded-lg transition-all ${darkMode ? 'bg-pink-600/20 hover:bg-pink-600/40' : 'bg-pink-100 hover:bg-pink-200'}`}>
                  <FaInstagram size={16} className="text-pink-600" />
                </button>
              </motion.div>
            )}

            <p className={`text-lg leading-relaxed mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {product.description}
            </p>

            {/* Price Section */}
            <div className={`mb-8 p-6 rounded-2xl ${darkMode ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-gray-800' : 'bg-gradient-to-r from-blue-50 via-white to-purple-50 border border-blue-100'}`}>
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-3">
                {product.price}
              </h2>
              <motion.p className={`text-sm font-semibold ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                ✓ Best Price | Free Shipping on orders over $50
              </motion.p>
            </div>
          </div>

          {/* COLOR SELECT */}
          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <h3 className="font-bold mb-3 uppercase text-sm tracking-wider">Colors</h3>
            <div className="flex gap-3 flex-wrap mb-6">
              {product.colors?.map((col) => (
                <motion.button
                  key={col}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedColor(col)}
                  className={`px-5 py-2 rounded-xl font-semibold transition-all duration-300 border-2 ${
                    selectedColor === col
                      ? darkMode
                        ? 'bg-purple-600/20 border-purple-600 text-purple-300'
                        : 'bg-blue-100 border-blue-600 text-blue-700'
                      : darkMode
                      ? 'bg-gray-800 border-gray-700 hover:border-gray-600'
                      : 'bg-gray-100 border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {col}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* SIZE SELECT */}
          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold uppercase text-sm tracking-wider">Sizes</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowSizeGuide(!showSizeGuide)}
                className={`text-xs font-semibold ${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-blue-600 hover:text-blue-700'}`}
              >
                Size Guide
              </motion.button>
            </div>
            <div className="flex gap-3 flex-wrap mb-6">
              {product.sizes?.map((s) => (
                <motion.button
                  key={s}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSize(s)}
                  className={`w-12 h-12 rounded-xl font-bold transition-all duration-300 ${
                    selectedSize === s
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/50 scale-110'
                      : darkMode
                      ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
                      : 'bg-gray-100 hover:bg-gray-200 border border-gray-300'
                  }`}
                >
                  {s}
                </motion.button>
              ))}
            </div>

            {/* Size Guide Modal */}
            {showSizeGuide && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`rounded-xl p-4 mb-6 ${darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-gray-100 border border-gray-300'}`}
              >
                <table className="w-full text-sm">
                  <thead>
                    <tr className={darkMode ? 'border-b border-gray-700' : 'border-b border-gray-300'}>
                      <th className="text-left p-2 font-bold">Size</th>
                      <th className="text-left p-2 font-bold">Bust (cm)</th>
                      <th className="text-left p-2 font-bold">Length (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { size: 'XS', bust: '32-34', length: '62' },
                      { size: 'S', bust: '34-36', length: '65' },
                      { size: 'M', bust: '38-40', length: '68' },
                      { size: 'L', bust: '42-44', length: '71' },
                      { size: 'XL', bust: '46-48', length: '74' },
                      { size: 'XXL', bust: '50-52', length: '77' },
                    ].map((row) => (
                      <tr key={row.size} className={darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200'}>
                        <td className="p-2 font-semibold">{row.size}</td>
                        <td className="p-2">{row.bust}</td>
                        <td className="p-2">{row.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            )}
          </motion.div>

          {/* Quantity */}
          <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="mb-6">
            <h3 className="font-bold mb-3 uppercase text-sm tracking-wider">Quantity</h3>
            <div className={`flex items-center gap-4 w-fit rounded-xl p-3 ${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-700' : 'bg-gradient-to-r from-gray-100 to-gray-200 border border-gray-300'}`}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-lg font-bold text-blue-600 hover:text-blue-700"
              >
                −
              </motion.button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className={`w-16 text-center font-bold outline-none rounded-lg ${darkMode ? 'bg-gray-900 text-white border border-gray-700' : 'bg-white text-gray-900 border border-gray-300'}`}
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setQuantity(quantity + 1)}
                className="text-lg font-bold text-blue-600 hover:text-blue-700"
              >
                +
              </motion.button>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div className="grid grid-cols-2 gap-4 mb-6" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: '0 20px 40px rgba(59, 130, 246, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-bold hover:shadow-2xl transition-all shadow-lg"
            >
              <FaShoppingCart /> Add to Cart
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleWishlistToggle}
              className={`border-2 py-3 rounded-xl flex items-center justify-center gap-2 font-bold hover:scale-105 transition ${
                isInWishlist(product.id)
                  ? darkMode
                    ? 'border-red-600 text-red-400 bg-red-600/10'
                    : 'border-red-600 text-red-600 bg-red-50'
                  : darkMode
                  ? 'border-gray-700 text-gray-300 hover:border-gray-600'
                  : 'border-gray-400 text-gray-600 hover:border-gray-500'
              }`}
            >
              <FaHeart />
              {isInWishlist(product.id) ? "Saved" : "Save"}
            </motion.button>
          </motion.div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: FaTruck, label: 'Free Shipping', desc: 'Over $50' },
              { icon: FaShieldAlt, label: 'Secure', desc: '100% Safe' },
              { icon: FaUndo, label: '30-Day Return', desc: 'Easy Return' },
            ].map((badge, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -5 }}
                className={`py-4 px-3 rounded-xl text-center transition-all ${darkMode ? 'bg-gradient-to-b from-gray-800 to-gray-900 border border-gray-700 hover:border-purple-600' : 'bg-gradient-to-b from-gray-100 to-gray-50 border border-gray-200 hover:border-blue-600'}`}
              >
                <badge.icon className="mx-auto mb-2 text-blue-600" size={20} />
                <p className="text-xs font-bold">{badge.label}</p>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{badge.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Product Specifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`max-w-6xl mx-auto px-4 py-12 rounded-2xl mt-8 ${darkMode ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-gray-800' : 'bg-gradient-to-r from-blue-50 via-white to-purple-50 border border-blue-100'}`}
      >
        <h2 className="text-3xl font-bold mb-8">Product Specifications</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {productSpecs.map((spec, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className={`p-6 rounded-xl text-center transition-all ${darkMode ? 'bg-gray-800 border border-gray-700 hover:border-purple-600' : 'bg-white border border-gray-200 hover:border-blue-600'}`}
            >
              <div className="text-4xl mb-3">{spec.icon}</div>
              <p className={`text-sm font-bold uppercase tracking-wider ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{spec.title}</p>
              <p className={`text-sm font-semibold mt-2 ${darkMode ? 'text-purple-400' : 'text-blue-600'}`}>{spec.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Reviews Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`max-w-6xl mx-auto px-4 py-12 rounded-2xl mt-8 ${darkMode ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-gray-800' : 'bg-gradient-to-r from-blue-50 via-white to-indigo-50 border border-blue-100'}`}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Customer Reviews</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${darkMode ? 'bg-purple-600/20 text-purple-300 hover:bg-purple-600/40' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
          >
            Write a Review
          </motion.button>
        </div>

        <div className="space-y-6">
          {[
            { name: 'Emma Wilson', rating: 5, text: 'Perfect fit and amazing quality! Exactly as described.', avatar: '👩‍🦰', verified: true },
            { name: 'David Chen', rating: 4, text: 'Great product! Shipping was fast. Very happy with my purchase.', avatar: '👨‍💼', verified: true },
            { name: 'Lisa Martinez', rating: 5, text: 'Best quality I\'ve ever seen. Highly recommend! Love it!', avatar: '👩‍🎨', verified: true },
          ].map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              className={`p-6 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-700 hover:border-purple-600' : 'bg-white border-gray-200 hover:border-blue-400'} transition-all`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-4xl">{review.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-bold text-lg">{review.name}</p>
                      {review.verified && (
                        <div className="flex items-center gap-1 text-xs text-green-500">
                          <FaCheck size={12} /> Verified Purchase
                        </div>
                      )}
                    </div>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} size={14} className={i < review.rating ? 'fill-current' : 'opacity-30'} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{review.text}</p>
              <motion.div className="flex gap-6 mt-4 text-sm">
                <button className={`font-semibold ${darkMode ? 'text-purple-400 hover:text-purple-300' : 'text-blue-600 hover:text-blue-700'}`}>
                  👍 Helpful ({idx === 0 ? 45 : idx === 1 ? 32 : 58})
                </button>
                <button className={`font-semibold ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'}`}>
                  👎 Not Helpful
                </button>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Newsletter Signup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={`max-w-6xl mx-auto px-4 py-12 rounded-3xl text-center overflow-hidden relative mt-8 mb-12 ${
          darkMode
            ? 'bg-gradient-to-r from-purple-900/30 via-fuchsia-900/30 to-pink-900/30 border border-purple-700/50'
            : 'bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 border border-blue-300'
        }`}
      >
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">Get Exclusive Offers</h2>
          <p className={`mb-8 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Subscribe to our newsletter for 15% OFF your first order
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className={`flex-1 px-6 py-3 rounded-xl outline-none transition-all ${
                darkMode
                  ? 'bg-gray-900 text-white border border-gray-700 focus:border-purple-600'
                  : 'bg-white text-gray-900 border border-gray-300 focus:border-blue-600'
              }`}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Subscribe
            </motion.button>
          </div>
          <p className={`mt-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            We won't spam you. Unsubscribe at any time.
          </p>
        </div>
      </motion.div>

      {/* RELATED PRODUCTS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="max-w-6xl mx-auto px-4 mt-12 pb-12"
      >
        <h2 className="text-3xl font-bold mb-8">
          Related {category.toUpperCase()} Products
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <ProductCard
                product={item}
                onAdd={() => addToCart(item)}
                onWishlist={() => {
                  if (isInWishlist(item.id)) removeFromWishlist(item.id);
                  else addToWishlist(item);
                }}
                isWish={isInWishlist(item.id)}
                link={`/product/${category}/${item.id}`}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SinglePage;
