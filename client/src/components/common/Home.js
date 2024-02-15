import React from 'react';
import { Container, Button, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { RiBeerFill } from 'react-icons/ri';
import Beers from '../beers/Beers';
import Breweries from '../breweries/Breweries';

const Home = () => {
  return (
    <Container>
      <div className="px-4 py-5 my-5 text-center">
        <RiBeerFill size={100} />
        <h1 className="display-5 fw-bold">Welcome to the craft-beer-shop!</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Check out our breweries and explore our wide selection of craft
            beers.
          </p>
          <Stack
            direction="horizontal"
            gap={3}
            className="justify-content-center"
          >
            <Link to="/breweries">
              <Button
                variant="outline-secondary"
                size="lg"
                className="px-4 gap-3"
              >
                Breweries
              </Button>
            </Link>
            <Link to="/beers">
              <Button variant="primary" size="lg" className="px-4">
                Beers
              </Button>
            </Link>
          </Stack>
        </div>
      </div>
      <Breweries />
      <Beers />
    </Container>
  );
};

export default Home;
