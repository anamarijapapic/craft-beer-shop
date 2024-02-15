import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const useGetBeer = (id) => {
  const { authToken } = useAuth();
  const [beer, setBeer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBeers = async () => {
      try {
        const response = await fetch(`http://localhost:5000/beers/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setBeer(data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBeers();
  }, [id, authToken]);

  return { beer, loading, error };
};

export default useGetBeer;
