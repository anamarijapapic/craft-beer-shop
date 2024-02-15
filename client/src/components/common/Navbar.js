import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import usePostLogout from '../../hooks/auth/usePostLogout';

const CustomNavbar = () => {
  const { user } = useAuth();
  const { postLogout } = usePostLogout();

  const handleLogout = async () => {
    postLogout();
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="px-5">
      <Navbar.Brand as={Link} to="/">
        craft-beer-shop
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/beers">
            Beers
          </Nav.Link>
          <Nav.Link as={Link} to="/breweries">
            Breweries
          </Nav.Link>
          <Nav.Link as={Link} to="/cart">
            Cart
          </Nav.Link>
          {user && user.isAdmin && (
            <Nav.Link as={Link} to="/users">
              Users
            </Nav.Link>
          )}
        </Nav>
        <Nav>
          <Nav.Link>Welcome, {user.email}</Nav.Link>
          <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default CustomNavbar;
