import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';

const ProductCard = ({ product, onAdd, onWishlist, isWish, link }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col h-full">
      <div className="w-full h-44 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden mb-3 relative">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />

        <button
          onClick={() => onWishlist && onWishlist(product)}
          aria-label="toggle-wishlist"
          className={`absolute top-2 right-2 p-2 rounded-full transition ${isWish ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'}`}>
          <FaHeart size={16} />
        </button>
      </div>

      <RouterLink to={link || '#'}>
        <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1 line-clamp-2 hover:text-indigo-600 transition">{product.name}</h3>
      </RouterLink>

      {product.description && <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">{product.description}</p>}

      <div className="mt-auto">
        <div className="text-lg font-bold text-indigo-600 dark:text-indigo-300 mb-3">{product.price}</div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onAdd && onAdd(product)}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold text-sm flex items-center justify-center gap-2 transition"
          >
            <FaShoppingCart size={14} /> Add
          </button>
          <RouterLink to={link || '#'} className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200">View</RouterLink>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
