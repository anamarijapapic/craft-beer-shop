import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import useGetBrewery from '../../hooks/breweries/useGetBrewery';

const BreweryDetails = () => {
  const { id } = useParams();
  const { brewery, loading, error } = useGetBrewery(id);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container className="mt-5">
      <h4>Brewery Details</h4>
      <Row>
        <h2>{brewery.name}</h2>
        <Col md={6}>
          <Link to={brewery.website}>
            <img
              src={brewery.image}
              alt={brewery.name}
              style={{ width: '100%' }}
              className="mb-3"
            />
          </Link>
        </Col>
        <Col md={6}>
          <p>Location: {brewery.location}</p>
          <p>Description: {brewery.description}</p>
          <p>
            Website: <Link to={brewery.website}>{brewery.website}</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default BreweryDetails;
