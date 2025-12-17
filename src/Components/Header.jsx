import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaMoon, FaSun } from 'react-icons/fa';
import { CartContext } from '../context/CartContext.jsx';
import { WishlistContext } from '../context/WishlistContext.jsx';
import { DarkModeContext } from '../context/DarkModeContext.jsx';

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const { cart } = useContext(CartContext);
  const { wishlistCount } = useContext(WishlistContext);
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 shadow-md flex items-center justify-between p-4">
      <h2 className="font-bold text-2xl text-red-600 hover:text-purple-600 cursor-pointer">
        <Link to="/">Fashion Store</Link>
      </h2>

      {/* Hamburger */}
      <button
        className="md:hidden flex flex-col justify-between w-6 h-5 focus:outline-none"
        onClick={() => setIsNavOpen(!isNavOpen)}
        aria-label="Toggle navigation"
      >
        <span className="block h-0.5 bg-black dark:bg-white"></span>
        <span className="block h-0.5 bg-black dark:bg-white"></span>
        <span className="block h-0.5 bg-black dark:bg-white"></span>
      </button>

      {/* Navigation */}
      <nav
        className={`absolute md:static top-16 left-0 w-full md:w-auto bg-white dark:bg-gray-900 px-8 md:px-0 transition-all duration-300 ${
          isNavOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'
        } md:opacity-100 md:translate-y-0 md:pointer-events-auto`}
      >
        <ul className="flex flex-col md:flex-row gap-6 md:gap-4 py-4 md:py-0 font-semibold text-xl text-gray-800 dark:text-gray-200">
          <li className="hover:text-blue-500 dark:hover:text-purple-400 transition-colors">
            <Link to="/">Home</Link>
          </li>
          <li className="hover:text-blue-500 dark:hover:text-purple-400 transition-colors">
            <Link to="/men">Men</Link>
          </li>
          <li className="hover:text-blue-500 dark:hover:text-purple-400 transition-colors">
            <Link to="/women">Women</Link>
          </li>
          <li className="hover:text-blue-500 dark:hover:text-purple-400 transition-colors">
            <Link to="/kids">Kids</Link>
          </li>
          <li className="hover:text-blue-500 dark:hover:text-purple-400 transition-colors">
            <Link to="/accessories">Accessories</Link>
          </li>
        </ul>
      </nav>

      {/* Icons */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <Link to="/wishlist" className="relative p-2 text-xl hover:text-pink-500 transition">
          <FaHeart className="text-red-500" size={20} />
          {wishlistCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
        </Link>

        <Link to="/cart" className="relative p-2 text-xl hover:text-green-500 transition">
          <FaShoppingCart className="text-blue-600" size={20} />
          {cart.length > 0 && (
            <span className="absolute top-0 right-0 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </Link>

        <Link
          to="/signup"
          className="px-6 py-2 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-lg hover:opacity-90 transition"
        >
          Sign Up
        </Link>
      </div>
    </header>
  );
};

export default Header;
