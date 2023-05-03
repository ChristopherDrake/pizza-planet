import React, { useState } from 'react';
import pepperoniImage from '../images/menuimages/pepperoni.jpg';
import margheritaImage from '../images/menuimages/margherita.jpg';
import hawaiianImage from '../images/menuimages/hawaiian.jpg';
import mozzarellaImage from '../images/menuimages/mozzarella.jpg';
import wingsImage from '../images/menuimages/wings.jpg';
import sodaImage from '../images/menuimages/soda.jpg';
import pestoImage from '../images/menuimages/pesto.jpg';
import chickenalfredoImage from '../images/menuimages/chicken_alfredo.jpg';
import meatballsImage from '../images/menuimages/meatball_pasta.jpg';
import bbqchickenImage from '../images/menuimages/bbq_chicken.jpg';
import chickenparmImage from '../images/menuimages/chicken_parmesan.jpg';
import chickenbaconranchpastaImage from '../images/menuimages/chicken_bacon_ranch_pasta.jpg';
import chickenbaconranchpizzaImage from '../images/menuimages/chicken_bacon_ranch.jpg';
import chickentendersImage from '../images/menuimages/chicken_tenders.jpg';
import spinachartichokeImage from '../images/menuimages/spinach_artichoke.jpg';
import shrimpalfredoImage from '../images/menuimages/shrimp_alfredo.jpg';
import meatloversImage from '../images/menuimages/meat_lovers.jpg';
import veggieImage from '../images/menuimages/vegetarian.jpg';



function MenuItem(props) {
  const { product, handleAddToCart } = props;
  const [showDescription, setShowDescription] = useState(false);

  const handleClick = () => {
    handleAddToCart(product);
  };

  const handleShowMore = () => {
    setShowDescription(!showDescription);
  };

  const getImage = () => {
    switch (product.image) {
      case '../images/menuimages/pepperoni.jpg':
        return pepperoniImage;
      case '../images/menuimages/margherita.jpg':
        return margheritaImage;
      case '../images/menuimages/hawaiian.jpg':
        return hawaiianImage;
      case '../images/menuimages/mozzarella.jpg':
        return mozzarellaImage;
      case '../images/menuimages/wings.jpg':
        return wingsImage;
      case '../images/menuimages/soda.jpg':
        return sodaImage;
      case '../images/menuimages/pesto.jpg':
        return pestoImage;
      case '../images/menuimages/chicken_alfredo.jpg':
        return chickenalfredoImage;
      case '../images/menuimages/meatball_pasta.jpg':
        return meatballsImage;
      case '../images/menuimages/bbq_chicken.jpg':
        return bbqchickenImage;
      case '../images/menuimages/chicken_parmesan.jpg':
        return chickenparmImage;
      case '../images/menuimages/chicken_bacon_ranch_pasta.jpg':
        return chickenbaconranchpastaImage;
      case '../images/menuimages/chicken_bacon_ranch.jpg':
        return chickenbaconranchpizzaImage;
      case '../images/menuimages/chicken_tenders.jpg':
        return chickentendersImage;
      case '../images/menuimages/spinach_artichoke.jpg':
        return spinachartichokeImage;
      case '../images/menuimages/shrimp_alfredo.jpg':
        return shrimpalfredoImage;
      case '../images/menuimages/meat_lovers.jpg':
        return meatloversImage;
      case '../images/menuimages/vegetarian.jpg':
        return veggieImage;
      default:
        return null;
    }
  };

  return (
    <div className="menu-item">
      <h3>{product.name}</h3>
      <img src={getImage()} alt={product.name} width="200" height="200" />
      {showDescription && <p>{product.description}</p>}
      <p>
        <button onClick={handleShowMore}>
          {showDescription ? "Show Less" : "Show More"}
        </button>
      </p>
      <p>${(product.price / 100).toFixed(2)}</p>
      <button onClick={handleClick}>Add to Cart</button>
    </div>
      );
  }
export default MenuItem;