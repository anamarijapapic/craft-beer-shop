import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const usePutBeer = (id, beerData) => {
  const { authToken } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const putBeer = async (id, beerData) => {
    try {
      const response = await fetch(`http://localhost:5000/beers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(beerData),
      });
      if (response.ok) {
        navigate('/beers');
      } else {
        setError('Failed to update beer');
      }
    } catch (error) {
      setError(error);
    }
  };

  return { putBeer, error };
};

export default usePutBeer;
