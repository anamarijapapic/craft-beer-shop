import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const usePostBrewery = () => {
  const { authToken } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const postBrewery = async (breweryData) => {
    try {
      const response = await fetch('http://localhost:5000/breweries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(breweryData),
      });
      if (response.ok) {
        navigate('/breweries');
      } else {
        setError('Failed to add brewery');
      }
    } catch (error) {
      setError(error);
    }
  };

  return { postBrewery, error };
};

export default usePostBrewery;
