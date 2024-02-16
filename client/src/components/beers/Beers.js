import React, { useState } from 'react';
import { Container, Row, Col, Stack, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import BeerCard from './BeerCard';
import useGetBeers from '../../hooks/beers/useGetBeers';
import useDeleteBeer from '../../hooks/beers/useDeleteBeer';
import useGetBreweries from '../../hooks/breweries/useGetBreweries';
import { useAuth } from '../../context/AuthContext';

const Beers = () => {
  const { user } = useAuth();
  const { beers, loading, error, refetchBeers } = useGetBeers();
  const { deleteBeer } = useDeleteBeer();
  const {
    breweries,
    loading: breweriesLoading,
    error: breweriesError,
  } = useGetBreweries();

  const [selectedBrewery, setSelectedBrewery] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [sortBy, setSortBy] = useState('');

  const handleDeleteBeer = async (id) => {
    if (window.confirm('Are you sure you want to delete this beer?')) {
      deleteBeer(id, refetchBeers);
    }
  };

  if (loading || breweriesLoading) {
    return <p>Loading...</p>;
  }

  if (error || breweriesError) {
    return <p>Error: {error ? error.message : breweriesError.message}</p>;
  }

  const handleSortBy = (e) => {
    setSortBy(e.target.value);
  };

  const sortOptions = [
    { label: 'Sort by Price: Low to High', value: 'price_asc' },
    { label: 'Sort by Price: High to Low', value: 'price_desc' },
  ];

  const filteredBeers = beers.filter((beer) => {
    const matchesBrewery =
      !selectedBrewery || beer.brewery.name === selectedBrewery;
    const matchesStyle = !selectedStyle || beer.style === selectedStyle;
    return matchesBrewery && matchesStyle;
  });

  const sortedBeers = [...filteredBeers];

  if (sortBy === 'price_asc') {
    sortedBeers.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price_desc') {
    sortedBeers.sort((a, b) => b.price - a.price);
  }

  const breweryOptions = [
    <option key="" value="">
      All Breweries
    </option>,
    ...breweries.map((brewery) => (
      <option key={brewery._id} value={brewery.name}>
        {brewery.name}
      </option>
    )),
  ];

  const styleOptions = [
    <option key="" value="">
      All Styles
    </option>,
    ...Array.from(new Set(beers.map((beer) => beer.style))).map((style) => (
      <option key={style} value={style}>
        {style}
      </option>
    )),
  ];

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
      <Form>
        <Form.Group as={Row} className="mx-3 my-3">
          <Form.Label column sm={2}>
            Brewery:
          </Form.Label>
          <Col sm={4}>
            <Form.Select
              value={selectedBrewery}
              onChange={(e) => setSelectedBrewery(e.target.value)}
            >
              {breweryOptions}
            </Form.Select>
          </Col>
          <Form.Label column sm={2}>
            Style:
          </Form.Label>
          <Col sm={4}>
            <Form.Select
              value={selectedStyle}
              onChange={(e) => setSelectedStyle(e.target.value)}
            >
              {styleOptions}
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mx-3 my-3">
          <Form.Label column sm={2}>
            Sort By:
          </Form.Label>
          <Col sm={4}>
            <Form.Select onChange={handleSortBy}>
              <option value="">None</option>
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
      </Form>
      <Row className="card-container" md={2} lg={3}>
        {sortedBeers.length > 0 ? (
          sortedBeers.map((beer) => (
            <Col className="d-flex" key={beer._id}>
              <BeerCard
                beer={beer}
                onDelete={() => handleDeleteBeer(beer._id)}
              />
            </Col>
          ))
        ) : (
          <Col className="text-center">
            <p>No results found.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Beers;
