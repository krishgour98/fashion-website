// src/context/CartContext.jsx
import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Men T-Shirt",
      price: "499",
      quantity: 2,
      image: "https://via.placeholder.com/150",
      description: "Comfortable cotton t-shirt",
    },
    {
      id: 2,
      name: "Women Dress",
      price: "999",
      quantity: 1,
      image: "https://via.placeholder.com/150",
      description: "Elegant evening dress",
    },
  ]);

  const totalPrice = cart.reduce(
    (acc, item) => acc + parseInt(item.price) * item.quantity,
    0
  );

  const updateQuantity = (id, qty) => {
    setCart(cart.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, totalPrice, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
