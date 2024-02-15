import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import useGetBeer from '../../hooks/beers/useGetBeer';

const BeerDetails = () => {
  const { id } = useParams();
  const { beer, loading, error } = useGetBeer(id);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container className="mt-5">
      <h4>Beer Details</h4>
      <Row>
        <h2>{beer.name}</h2>
        <Col md={6}>
          <img
            src={beer.image}
            alt={beer.name}
            style={{ width: '100%' }}
            className="mb-3"
          />
        </Col>
        <Col md={6}>
          <p>Style: {beer.style}</p>
          <p>ABV: {beer.abv}%</p>
          <p>IBU: {beer.ibu}</p>
          <p>Description: {beer.description}</p>
          <p>Price: {beer.price} €</p>
          <p>
            Brewery:
            <Link to={`/breweries/${beer.brewery._id}`}>
              <img
                src={beer.brewery.image}
                alt={beer.brewery.name}
                width={100}
                className="ms-1"
              />
            </Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default BeerDetails;
