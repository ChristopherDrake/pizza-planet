import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function Cart(props) {
  const { cartItems, setCartItems } = props;

  const handleRemoveFromCart = (product) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== product.id)
    );
  };

  const handleIncreaseItemCount = (product) => {
    setCartItems((prevCartItems) => {
      return prevCartItems.map((item) =>
        item.id === product.id ? { ...item, count: item.count + 1 } : item
      );
    });
  };

  const handleDecreaseItemCount = (product) => {
    setCartItems((prevCartItems) => {
      return prevCartItems.map((item) =>
        item.id === product.id && item.count > 1
          ? { ...item, count: item.count - 1 }
          : item
      );
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.count, 0);
  };

  return (
    <div>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price / 100} x {item.count}
            <button onClick={() => handleDecreaseItemCount(item)}>-</button>
            <button onClick={() => handleIncreaseItemCount(item)}>+</button>
            <button onClick={() => handleRemoveFromCart(item)}>
              <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
            </button>
          </li>
        ))}
      </ul>
      <h3>Total: ${getTotalPrice() / 100}</h3>
    </div>
  );
}

export default Cart;
