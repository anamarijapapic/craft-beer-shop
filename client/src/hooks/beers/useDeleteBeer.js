import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const useDeleteBeer = (id) => {
  const { authToken } = useAuth();
  const [error, setError] = useState(null);

  const deleteBeer = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/beers/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        window.location.reload();
      } else {
        setError('Failed to delete beer');
      }
    } catch (error) {
      setError(error);
    }
  };

  return { deleteBeer, error };
};

export default useDeleteBeer;
