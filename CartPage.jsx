import React, { useContext } from "react";
import { CartContext } from "../context/CartContext.jsx";
import { FaTrash, FaShoppingBag, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } =
    useContext(CartContext);

  const navigate = useNavigate();

  const getPriceNumber = (price) => {
    if (typeof price === "string") {
      return parseInt(price.replace(/[^\d]/g, ""));
    }
    return price;
  };

  const tax = Math.floor(totalPrice * 0.18);
  const finalTotal = totalPrice + tax;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* HEADER */}
      <div className="bg-blue-700 text-white py-10 px-6 shadow-lg">
        <h1 className="text-4xl font-bold max-w-7xl mx-auto">🛒 Your Cart</h1>
        <p className="opacity-80 max-w-7xl mx-auto text-lg">Review your selected items</p>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-10">

        {cart.length === 0 ? (
          <div className="text-center py-24">
            <FaShoppingBag className="text-7xl text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Your cart is empty!
            </h2>
            <p className="text-gray-600 mb-8">
              Add items to your cart to see them here.
            </p>
            <Link
              to="/"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition"
            >
              Start Shopping →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* LEFT SECTION - Cart Items */}
            <div className="lg:col-span-2 space-y-4">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-6 shadow-md flex gap-4 hover:shadow-lg transition border"
                >
                  {/* Product Image */}
                  <img
                    src={item.image}
                    className="w-32 h-32 rounded-xl object-cover border"
                    alt=""
                  />

                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
                    <p className="text-gray-600 text-sm mt-1">{item.description}</p>

                    <p className="text-blue-600 text-lg font-bold mt-3">
                      ₹{getPriceNumber(item.price)}
                    </p>

                    <p className="text-sm text-gray-500">
                      Subtotal: ₹{getPriceNumber(item.price) * item.quantity}
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                        className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold"
                      >
                        −
                      </button>

                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) =>
                          updateQuantity(
                            item.id,
                            Math.max(1, parseInt(e.target.value))
                          )
                        }
                        className="w-16 text-center border rounded-lg py-1"
                      />

                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-8 h-8 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:bg-red-100 p-3 rounded-lg transition"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              ))}

            </div>

            {/* RIGHT SECTION - Summary */}
            <div className="bg-white rounded-xl shadow-lg p-6 h-fit sticky top-24 border">

              <h3 className="text-2xl font-bold text-gray-800 mb-6">Order Summary</h3>

              <div className="space-y-3 pb-4 border-b">
                <div className="flex justify-between text-gray-700">
                  <span>Items ({cart.length})</span>
                  <span>₹{totalPrice}</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>

                <div className="flex justify-between text-gray-700">
                  <span>GST (18%)</span>
                  <span>₹{tax}</span>
                </div>
              </div>

              <div className="flex justify-between text-2xl font-bold text-gray-900 mt-4">
                <span>Total</span>
                <span className="text-blue-600">₹{finalTotal}</span>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-bold mt-6 transition flex items-center justify-center gap-2"
              >
                <FaLock />
                Proceed to Checkout
              </button>

              <button
                onClick={clearCart}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold mt-3 transition"
              >
                Clear Cart
              </button>

              <Link
                to="/"
                className="block text-center text-blue-600 hover:text-blue-700 font-semibold mt-3"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
