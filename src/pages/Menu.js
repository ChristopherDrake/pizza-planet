import React, { useState } from 'react';
import Items from '../components/Items.js';
import Cart from '../components/Cart.js';
import MenuItem from '../components/MenuItem.js';
import CheckoutForm from '../components/Checkout.js';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


import './Menu.css';

function MenuPage() {
  const [cartItems, setCartItems] = useState([]);

  const stripePromise = loadStripe("pk_test_51N2KiYDpQVHsLbUuNw2QJboOx9nR4KDyo2Vu" +
  "bkYlucIVUYDXXoOGMLk4JnX9YpTQJlQO1GcmLkb8nTecQYQxlP7S005ytlvPSm");

  const handleAddToCart = (product) => {
    const existingCartItem = cartItems.find((item) => item.id === product.id);

    if (existingCartItem) {
      setCartItems((prevCartItems) =>
        prevCartItems.map((item) =>
          item.id === product.id ? { ...item, count: item.count + 1 } : item
        )
      );
    } else {
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        { ...product, count: 1 },
      ]);
    }
  };

  return (
    <div className="menu-page">
      <div className="menu-items">
        {Items.products.map((product) => (
          <MenuItem
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
      <div className="cart">
        <Elements stripe={stripePromise}>
          <Cart cartItems={cartItems} setCartItems={setCartItems} />
          <CheckoutForm cartItems={cartItems} />
        </Elements>
      </div>

    </div>
  );
}

export default MenuPage;
