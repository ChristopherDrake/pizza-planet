import React, { useContext } from 'react';
import Items from '../components/Items.js';
import Cart from '../components/Cart.js';
import MenuItem from '../components/MenuItem.js';
import { CartContext} from '../services/CartContext.js';
import './Menu.css';

function MenuPage() {
  const { cartItems, setCartItems } = useContext(CartContext);


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
  const appetizers = Items.products.filter((product) => product.category === 'appetizer');
  const pizzas = Items.products.filter((product) => product.category === 'pizza');
  const pasta = Items.products.filter((product) => product.category === 'pasta');
  const drinks = Items.products.filter((product) => product.category === 'drink');
  // const miscellaneous = Items.products.filter(
  //   (product) =>
  //     product.category !== 'appetizer' &&
  //     product.category !== 'pizza' &&
  //     product.category !== 'pasta' &&
  //     product.category !== 'drink'
  // )
  const renderMenuItems = (items) => {
    return items.map((product) => (
      <MenuItem key={product.id} product={product} handleAddToCart={handleAddToCart} />
    ));
  };
  return (
    <div className="menu-page">
      <div className="menu-section">
        <h1>Appetizers</h1>
        <div className="menu-items">
        {renderMenuItems(appetizers)}
        <br/>
        </div>
      </div>
      <div className="menu-section">  
        <h1>Pizzas</h1>
        <div className="menu-items">
        {renderMenuItems(pizzas)}
        <br/>
        </div>
      </div>
      <div className="menu-section">
        <h1>Pasta</h1>
        <div className="menu-items">
        {renderMenuItems(pasta)}
        <br/>
      </div>
      </div>
      <div className="menu-section">
        <h1>Drinks</h1>
        <div className="menu-items">
        {renderMenuItems(drinks)}
        <br/>
        </div>
      </div>
      <div className="cart">
        <Cart cartItems={cartItems} setCartItems={setCartItems} />
      </div>
    </div>
  );
}

export default MenuPage;
