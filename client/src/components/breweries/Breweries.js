import React, { useState } from 'react';
import { Container, Row, Col, Stack, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import BreweryCard from './BreweryCard';
import useGetBreweries from '../../hooks/breweries/useGetBreweries';
import useDeleteBrewery from '../../hooks/breweries/useDeleteBrewery';
import { useAuth } from '../../context/AuthContext';

const Breweries = () => {
  const { user } = useAuth();
  const { breweries, loading, error, refetchBreweries } = useGetBreweries();
  const { deleteBrewery } = useDeleteBrewery();

  const [selectedLocation, setSelectedLocation] = useState('');

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

  const uniqueLocations = [
    ...new Set(breweries.map((brewery) => brewery.location)),
  ];

  const filteredBreweries = selectedLocation
    ? breweries.filter((brewery) => brewery.location === selectedLocation)
    : breweries;

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
      <Form className="my-3">
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="2">
            Location:
          </Form.Label>
          <Col sm="10">
            <Form.Select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">All Locations</option>
              {uniqueLocations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
      </Form>
      <Row className="card-container" md={2} lg={3}>
        {filteredBreweries.map((brewery) => (
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
