import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Stack } from 'react-bootstrap';
import {
  BsGeoAltFill,
  BsGlobe,
  BsInfoCircle,
  BsPencilSquare,
  BsTrash,
} from 'react-icons/bs';
import { useAuth } from '../../context/AuthContext';

const BreweryCard = ({ brewery, onDelete }) => {
  const { user } = useAuth();

  const handleDelete = async () => {
    onDelete();
  };

  return (
    <Card
      className="flex-fill text-center"
      key={brewery._id}
      style={{ width: '18rem', margin: '1rem' }}
    >
      <Card.Img
        variant="top"
        src={brewery.image}
        style={{ objectFit: 'contain', minHeight: 50, maxHeight: 100 }}
        className="mt-3"
      />
      <Card.Body>
        <Card.Title>{brewery.name}</Card.Title>
        <Card.Text>
          <BsGeoAltFill size={16} /> {brewery.location}
          <br />
          <BsGlobe size={16} />{' '}
          <Link to={brewery.website}>{brewery.website}</Link>
        </Card.Text>
        <Stack direction="horizontal" className="justify-content-around mx-3">
          <Link
            to={`/breweries/${brewery._id}`}
            className="btn btn-light text-info"
          >
            <BsInfoCircle />
          </Link>
          {user && user.isAdmin && (
            <>
              <Link
                to={`/breweries/edit/${brewery._id}`}
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

export default BreweryCard;
