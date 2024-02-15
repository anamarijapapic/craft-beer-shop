import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const useDeleteBeer = () => {
  const { authToken } = useAuth();
  const [error, setError] = useState(null);

  const deleteBeer = async (id, refetchBeers) => {
    try {
      const response = await fetch(`http://localhost:5000/beers/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete beer');
      }
      refetchBeers(); // Trigger refetch after deleting the beer
    } catch (error) {
      setError(error);
    }
  };

  return { deleteBeer, error };
};

export default useDeleteBeer;
