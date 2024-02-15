import React, { useEffect, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useGetBrewery from '../../hooks/breweries/useGetBrewery';
import usePutBrewery from '../../hooks/breweries/usePutBrewery';
import { useAuth } from '../../context/AuthContext';
import { BsFloppyFill } from 'react-icons/bs';

const EditBrewery = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { brewery, loading, getError } = useGetBrewery(id);
  const { putBrewery, putError } = usePutBrewery(id, brewery);

  const [name, setName] = useState(brewery.name || '');
  const [location, setLocation] = useState(brewery.location || '');
  const [image, setImage] = useState(brewery.image || '');
  const [description, setDescription] = useState(brewery.description || '');
  const [website, setWebsite] = useState(brewery.website || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const breweryData = {
      _id: brewery._id,
      name,
      location,
      image,
      description,
      website,
    };
    putBrewery(id, breweryData);
  };

  useEffect(() => {
    setName(brewery.name || '');
    setLocation(brewery.location || '');
    setImage(brewery.image || '');
    setDescription(brewery.description || '');
    setWebsite(brewery.website || '');
  }, [brewery]);

  if (!user || !user.isAdmin) {
    return (
      <Container className="mt-5">
        <h1>Only admin access allowed</h1>
      </Container>
    );
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (getError) {
    return <div>Error: {getError.message}</div>;
  }

  return (
    <Container className="mt-5">
      <h2>Edit Brewery</h2>
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
            placeholder="Enter website URL"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </Form.Group>

        {putError && <p className="text-danger">{putError}</p>}

        <Button variant="warning" type="submit" size="lg" className="mb-5">
          <BsFloppyFill /> Update
        </Button>
      </Form>
    </Container>
  );
};

export default EditBrewery;
