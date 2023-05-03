import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navigation';
import HomePage from './pages/Home';
import MenuPage from './pages/Menu';
import ContactUsPage from './pages/Contact';
import FAQPage from './pages/FAQ';
import AboutUsPage from './pages/About';
import SignUpPage from './pages/SignUp';
import LoginPage from './pages/Login';
import AccountPage from './pages/Account';
import CheckoutPage from './pages/Checkout';
import basename from './services/basename';
import {CartProvider} from './services/CartContext';
import './App.css';


function App() {
  return (
    <CartProvider>
      <BrowserRouter basename={basename}>
        <div className="App">
          <NavigationBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu"element={<MenuPage/>}/>
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/FAQ" element={<FAQPage />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/sign-up" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
