import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext.jsx';
import { WishlistProvider } from './context/WishlistContext.jsx';
import { DarkModeProvider } from './context/DarkModeContext.jsx';

import Header from './Components/Header.jsx';
import Footer from './Components/Footer.jsx';
import Home from './Components/Home.jsx';
import MenPage from './Pages/MenPage.jsx';
import WomenPage from './Pages/WomenPage.jsx';
import KidsPage from './Pages/KidsPage.jsx';
import Accessoriespage from './Pages/Accessoriespage.jsx';
import CartPage from './Pages/CartPage.jsx';
import WishlistPage from './Pages/WishlistPage.jsx';
import SignupPage from './Pages/SignupPage.jsx';
import SinglePage from './Pages/SinglePage.jsx';
import BrandPage from './Pages/BrandPage.jsx';
import CheckoutPage from './Pages/CheckoutPage.jsx';

function App() {
  return (
    <DarkModeProvider>
      <CartProvider>
        <WishlistProvider>
          <BrowserRouter>
            <Header />
            <div className="pt-16 bg-gray-100 dark:bg-gray-800 min-h-screen">
              <Routes>
                <Route path="/fashion-website" element={<Home />} />
                <Route path="/men" element={<MenPage />} />
                <Route path="/women" element={<WomenPage />} />
                <Route path="/kids" element={<KidsPage />} />
                <Route path="/accessories" element={<Accessoriespage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/product/:category/:id" element={<SinglePage />} />
                <Route path="/brand/:brandId" element={<BrandPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Routes>
            </div>
            <Footer />
          </BrowserRouter>
        </WishlistProvider>
      </CartProvider>
    </DarkModeProvider>
  );
}

export default App;
