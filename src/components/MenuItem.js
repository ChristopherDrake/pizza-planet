import React from 'react';
import pepperoniImage from '../images/pepperoni.jpg';
import margheritaImage from '../images/margherita.jpg';
import hawaiianImage from '../images/hawaiian.jpg';
import mozzarellaImage from '../images/mozzarella.jpg';
import wingsImage from '../images/wings.jpg';
import sodaImage from '../images/soda.jpg';

function MenuItem(props) {
  const { product, handleAddToCart } = props;

  const handleClick = () => {
    handleAddToCart(product);
  };

  const getImage = () => {
    switch (product.image) {
      case '../images/pepperoni.jpg':
        return pepperoniImage;
      case '../images/margherita.jpg':
        return margheritaImage;
      case '../images/hawaiian.jpg':
        return hawaiianImage;
      case '../images/mozzarella.jpg':
        return mozzarellaImage;
      case '../images/wings.jpg':
        return wingsImage;
      case '../images/soda.jpg':
        return sodaImage;
      default:
        return null;
    }
  };

  return (
    <div className="menu-item">
      <h3>{product.name}</h3>
      <img src={getImage()} alt={product.name} width="100" height="100" />
      <p>{product.description}</p>
      <p>${(product.price / 100).toFixed(2)}</p>
      <button onClick={handleClick}>Add to Cart</button>
    </div>
  );
}

export default MenuItem;
