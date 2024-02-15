import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const useDeleteBrewery = (id) => {
  const { authToken } = useAuth();
  const [error, setError] = useState(null);

  const deleteBrewery = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/breweries/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        window.location.reload();
      } else {
        setError('Failed to delete brewery');
      }
    } catch (error) {
      setError(error);
    }
  };

  return { deleteBrewery, error };
};

export default useDeleteBrewery;
