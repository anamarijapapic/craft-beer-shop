import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Stack } from 'react-bootstrap';
import {
  BsCartPlus,
  BsHeart,
  BsInfoCircle,
  BsPencilSquare,
  BsTrash,
} from 'react-icons/bs';
import { useAuth } from '../../context/AuthContext';
import { useShop } from '../../context/ShopContext';

const BeerCard = ({ beer, onDelete }) => {
  const { user } = useAuth();
  const { addToCart, addToFavorites } = useShop();

  const handleDelete = async () => {
    onDelete();
  };

  const handleAddToCart = () => {
    addToCart(beer);
  };

  const handleAddToFavorites = () => {
    addToFavorites(beer);
  };

  return (
    <Card
      className="flex-fill text-center"
      key={beer._id}
      style={{ width: '18rem', margin: '1rem' }}
    >
      <Card.Img variant="top" src={beer.image} />
      <Card.Body>
        <Card.Title>{beer.name}</Card.Title>
        <div className="d-flex justify-content-around mx-3 mb-3">
          {beer.style}
          <div className="vr"></div>
          ABV: {beer.abv}%<div className="vr"></div>
          IBU: {beer.ibu}
        </div>
        <div className="d-flex justify-content-around mx-3">
          <Link to={`/breweries/${beer.brewery._id}`}>
            <img
              src={beer.brewery.image}
              alt={beer.brewery.name}
              width={60}
              className="ms-1"
            />
          </Link>
          <p>
            Price: <b>{beer.price} €</b>
          </p>
        </div>
        <Stack direction="horizontal" className="justify-content-around mx-3">
          <Link onClick={handleAddToCart} className="btn btn-light">
            <BsCartPlus />
          </Link>
          <Link onClick={handleAddToFavorites} className="btn btn-light">
            <BsHeart />
          </Link>
          <Link to={`/beers/${beer._id}`} className="btn btn-light text-info">
            <BsInfoCircle />
          </Link>
          {user && user.isAdmin && (
            <>
              <Link
                to={`/beers/edit/${beer._id}`}
                className="btn btn-light text-warning"
              >
                <BsPencilSquare />
              </Link>
              <Button
                variant="light"
                className="text-danger"
                onClick={handleDelete}
              >
                <BsTrash />
              </Button>
            </>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default BeerCard;
