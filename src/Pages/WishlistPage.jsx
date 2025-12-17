import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext.jsx';
import { WishlistContext } from '../context/WishlistContext.jsx';
import { FaHeart, FaShoppingCart, FaTrash, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const WishlistPage = () => {
  const { addToCart } = useContext(CartContext);
  const { wishlist, removeFromWishlist, clearWishlist } = useContext(WishlistContext);
  const navigate = useNavigate();

  const getPriceNumber = (price) => {
    if (typeof price === 'string') {
      return parseInt(price.replace(/[^\d]/g, ''));
    }
    return price;
  };

  const moveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
    alert('✅ Product added to cart!');
  };

  const totalValue = wishlist.reduce((sum, item) => sum + getPriceNumber(item.price), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-3">
                <FaHeart size={40} className="text-red-300" />
                My Wishlist
              </h1>
              <p className="text-pink-100 mt-2 text-lg">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            {wishlist.length > 0 && (
              <button
                onClick={clearWishlist}
                className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition-all duration-300"
              >
                Clear Wishlist
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {wishlist.length === 0 ? (
          // Empty State
          <div className="text-center py-16">
            <div className="inline-block p-8 bg-gray-200 rounded-full mb-6">
              <FaHeart size={60} className="text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h2>
            <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
              Start adding your favorite items to your wishlist and we'll help you keep track of them!
            </p>
            <button
              onClick={() => navigate('/Men')}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
            >
              Continue Shopping <FaArrowRight />
            </button>
          </div>
        ) : (
          <>
            {/* Filter & Stats */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 p-6 bg-white rounded-2xl shadow-lg">
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total Items</p>
                    <p className="text-3xl font-bold text-purple-600">{wishlist.length}</p>
                  </div>
                  <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total Value</p>
                    <p className="text-3xl font-bold text-pink-600">₹{totalValue.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Filter */}
              <div className="flex flex-col items-end gap-2">
                <label className="text-sm font-semibold text-gray-700">Total Items:</label>
                <span className="text-2xl font-bold text-purple-600">{wishlist.length}</span>
              </div>
            </div>

            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-300"
                >
                  {/* Product Image */}
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-red-500 text-white p-3 rounded-full shadow-lg">
                      <FaHeart size={20} />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {item.name}
                    </h3>

                    {/* Description */}
                    {item.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <p className="text-2xl font-bold text-green-600">
                        ₹{getPriceNumber(item.price).toLocaleString()}
                      </p>
                      <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">
                        In Stock
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => moveToCart(item)}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <FaShoppingCart size={16} />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => removeFromWishlist(item.id)}
                        className="px-4 py-3 bg-red-100 hover:bg-red-500 text-red-600 hover:text-white font-bold rounded-lg transition-all duration-300"
                        title="Remove from wishlist"
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>

                    {/* View Details */}
                    <button
                      onClick={() => navigate(`/product/${item.id}`)}
                      className="w-full mt-3 px-4 py-2 text-purple-600 hover:text-pink-600 font-semibold border-b-2 border-purple-300 hover:border-pink-300 transition-all duration-300"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="text-center mt-12 pt-8 border-t border-gray-300">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Want to add more items?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/Men')}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={() => navigate('/Cart')}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 justify-center"
                >
                  <FaShoppingCart />
                  View Cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;