import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const usePostBeer = (beerData) => {
  const { authToken } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const postBeer = async (beerData) => {
    try {
      const response = await fetch('http://localhost:5000/beers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(beerData),
      });
      console.log(beerData);
      console.log(response);
      if (response.ok) {
        navigate('/beers');
      } else {
        setError('Failed to add beer');
      }
    } catch (error) {
      setError(error);
    }
  };

  return { postBeer, error };
};

export default usePostBeer;
