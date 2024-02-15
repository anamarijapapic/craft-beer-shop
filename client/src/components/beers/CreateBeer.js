import React, { useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import usePostBeer from '../../hooks/beers/usePostBeer';
import useGetBreweries from '../../hooks/breweries/useGetBreweries';
import { useAuth } from '../../context/AuthContext';
import { BsFloppyFill } from 'react-icons/bs';

const CreateBeer = () => {
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [style, setStyle] = useState('');
  const [image, setImage] = useState('');
  const [abv, setAbv] = useState('');
  const [ibu, setIbu] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [breweryId, setBreweryId] = useState('');
  const { breweries } = useGetBreweries();
  const { postBeer, error } = usePostBeer();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const beerData = {
      name,
      style,
      image,
      abv: parseFloat(abv),
      ibu: parseInt(ibu),
      description,
      price: parseFloat(price),
      breweryId,
    };
    postBeer(beerData);
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
      <h2>Create Beer</h2>
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

        <Form.Group className="mb-3" controlId="style">
          <Form.Label>Style</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter style"
            value={style}
            onChange={(e) => setStyle(e.target.value)}
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

        <Form.Group className="mb-3" controlId="abv">
          <Form.Label>ABV</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter ABV"
            value={abv}
            onChange={(e) => setAbv(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="ibu">
          <Form.Label>IBU</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter IBU"
            value={ibu}
            onChange={(e) => setIbu(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="breweryId">
          <Form.Label>Brewery</Form.Label>
          <Form.Control
            as="select"
            value={breweryId}
            onChange={(e) => setBreweryId(e.target.value)}
          >
            <option value="">Select brewery</option>
            {breweries.map((brewery) => (
              <option key={brewery._id} value={brewery._id}>
                {brewery.name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {error && <p className="text-danger">{error}</p>}

        <Button variant="success" type="submit" size="lg" className="mb-5">
          <BsFloppyFill /> Create
        </Button>
      </Form>
    </Container>
  );
};

export default CreateBeer;
