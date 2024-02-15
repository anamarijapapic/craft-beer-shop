import React, { useEffect, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import useGetBeer from '../../hooks/beers/useGetBeer';
import usePutBeer from '../../hooks/beers/usePutBeer';
import useGetBreweries from '../../hooks/breweries/useGetBreweries';
import { useAuth } from '../../context/AuthContext';
import { BsFloppyFill } from 'react-icons/bs';

const EditBeer = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { beer, loading, getError } = useGetBeer(id);
  const { breweries } = useGetBreweries();
  const { putBeer, putError } = usePutBeer(id, beer);

  const [name, setName] = useState(beer.name || '');
  const [style, setStyle] = useState(beer.style || '');
  const [image, setImage] = useState(beer.image || '');
  const [abv, setAbv] = useState(beer.abv || 0);
  const [ibu, setIbu] = useState(beer.ibu || 0);
  const [description, setDescription] = useState(beer.description || '');
  const [price, setPrice] = useState(beer.price || 0);
  const [breweryId, setBreweryId] = useState(beer.brewery?._id || '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const beerData = {
      _id: beer._id,
      name,
      style,
      image,
      abv: parseFloat(abv),
      ibu: parseInt(ibu),
      description,
      price: parseFloat(price),
      breweryId,
    };
    putBeer(id, beerData);
  };

  useEffect(() => {
    setName(beer.name || '');
    setStyle(beer.style || '');
    setImage(beer.image || '');
    setAbv(beer.abv || 0);
    setIbu(beer.ibu || 0);
    setDescription(beer.description || '');
    setPrice(beer.price || 0);

    if (beer.brewery) {
      setBreweryId(beer.brewery._id || '');
    }
  }, [beer]);

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
      <h2>Edit Beer</h2>
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

        {putError && <p className="text-danger">{putError}</p>}

        <Button variant="warning" type="submit" size="lg" className="mb-5">
          <BsFloppyFill /> Update
        </Button>
      </Form>
    </Container>
  );
};

export default EditBeer;
