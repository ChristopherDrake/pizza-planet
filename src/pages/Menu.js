import React, { useState } from 'react';
import Items from '../components/Items.js';
import Cart from '../components/Cart.js';
import MenuItem from '../components/MenuItem.js';
import './Menu.css';

function MenuPage() {
  const [cartItems, setCartItems] = useState([]);

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
        <Cart cartItems={cartItems} setCartItems={setCartItems} />
      </div>
    </div>
  );
}

export default MenuPage;
