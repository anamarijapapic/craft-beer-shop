import React from 'react';
import { Container, Row, Col, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import BreweryCard from './BreweryCard';
import useGetBreweries from '../../hooks/breweries/useGetBreweries';
import useDeleteBrewery from '../../hooks/breweries/useDeleteBrewery'; // Import useDeleteBrewery
import { useAuth } from '../../context/AuthContext';

const Breweries = () => {
  const { user } = useAuth();
  const { breweries, loading, error, refetchBreweries } = useGetBreweries();
  const { deleteBrewery } = useDeleteBrewery();

  const handleDeleteBrewery = async (id) => {
    if (window.confirm('Are you sure you want to delete this brewery?')) {
      deleteBrewery(id, refetchBreweries);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Container className="mt-5">
      <Stack direction="horizontal" className="justify-content-between">
        <h2>Breweries</h2>
        {user && user.isAdmin && (
          <Link to="/breweries/create">
            <BsFillPlusCircleFill size={40} />
          </Link>
        )}
      </Stack>
      <Row className="card-container" md={2} lg={3}>
        {breweries.map((brewery) => (
          <Col className="d-flex" key={brewery._id}>
            <BreweryCard
              brewery={brewery}
              onDelete={() => handleDeleteBrewery(brewery._id)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Breweries;
