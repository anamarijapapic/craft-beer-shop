import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import usePostBrewery from '../../hooks/breweries/usePostBrewery';
import { useAuth } from '../../context/AuthContext';
import { BsFloppyFill } from 'react-icons/bs';

const CreateBrewery = () => {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const { postBrewery, error } = usePostBrewery();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const breweryData = {
      name,
      location,
      image,
      description,
      website,
    };
    postBrewery(breweryData);
  };

  if (!user || !user.isAdmin) {
    return (
      <Container className="mt-5">
        <h1>Only admin access allowed</h1>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2>Create Brewery</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="location">
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="website">
          <Form.Label>Website</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </Form.Group>

        {error && <p className="text-danger">{error}</p>}

        <Button variant="success" type="submit" size="lg" className="mb-5">
          <BsFloppyFill /> Create
        </Button>
      </Form>
    </Container>
  );
};

export default CreateBrewery;
