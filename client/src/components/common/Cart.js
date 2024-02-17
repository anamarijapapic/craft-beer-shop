import React from 'react';
import { useShop } from '../../context/ShopContext';
import { Button, Container, ListGroup } from 'react-bootstrap';
import { BsCartCheck, BsCartDash, BsHeartbreak } from 'react-icons/bs';

const Cart = () => {
  const {
    cartItems,
    favorites,
    removeFromCart,
    clearCart,
    removeFromFavorites,
  } = useShop();

  const handleRemoveFromCart = (item) => {
    removeFromCart(item);
  };

  const handleRemoveFromFavorites = (item) => {
    removeFromFavorites(item);
  };

  const handleCheckout = () => {
    clearCart();
  };

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <Container className="mt-5">
      <h2>Shopping Cart</h2>
      <Button
        variant="success"
        className="mb-3"
        onClick={() => handleCheckout()}
      >
        <BsCartCheck />
      </Button>
      <ListGroup className="mb-3">
        {cartItems.map((item) => (
          <ListGroup.Item key={item.name}>
            <b>
              {item.name} ({item.brewery.name})
            </b>{' '}
            - Quantity: <b>{item.quantity}</b> - Total:{' '}
            <b>{(item.price * item.quantity).toFixed(2)} €</b>
            <Button
              variant="light"
              className="ms-3"
              onClick={() => handleRemoveFromCart(item)}
            >
              <BsCartDash />
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h4>Total:</h4>
      <p>
        Quantity: <b>{totalQuantity}</b> Price: <b>{totalPrice} €</b>
      </p>

      <h2>Favorites</h2>
      <ListGroup>
        {favorites.map((item) => (
          <ListGroup.Item key={item.name}>
            <b>
              {item.name} ({item.brewery.name})
            </b>
            <Button
              variant="light"
              className="ms-3"
              onClick={() => handleRemoveFromFavorites(item)}
            >
              <BsHeartbreak />
            </Button>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Cart;
