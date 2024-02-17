import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const useDeleteBrewery = () => {
  const { authToken } = useAuth();
  const [error, setError] = useState(null);

  const deleteBrewery = async (id, refetchBreweries) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/breweries/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        refetchBreweries(); // Trigger refetch after deleting the brewery
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
