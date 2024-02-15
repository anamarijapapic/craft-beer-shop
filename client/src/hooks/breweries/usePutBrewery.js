import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const usePutBrewery = () => {
  const { authToken } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const putBrewery = async (id, breweryData) => {
    try {
      const response = await fetch(`http://localhost:5000/breweries/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(breweryData),
      });
      if (response.ok) {
        navigate('/breweries');
      } else {
        setError('Failed to update brewery');
      }
    } catch (error) {
      setError(error);
    }
  };

  return { putBrewery, error };
};

export default usePutBrewery;
