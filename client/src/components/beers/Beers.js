import React from 'react';
import { Container, Row, Col, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import BeerCard from './BeerCard';
import useGetBeers from '../../hooks/beers/useGetBeers';
import { useAuth } from '../../context/AuthContext';

const Beers = () => {
  const { user } = useAuth();
  const { beers, loading, error } = useGetBeers();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Container className="mt-5">
      <Stack direction="horizontal" className="justify-content-between mx-3">
        <h2>Beers</h2>
        {user && user.isAdmin && (
          <Link to="/beers/create">
            <BsFillPlusCircleFill size={40} />
          </Link>
        )}
      </Stack>
      <Row className="card-container" md={2} lg={3}>
        {beers.map((beer) => (
          <Col className="d-flex" key={beer._id}>
            <BeerCard beer={beer} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Beers;
