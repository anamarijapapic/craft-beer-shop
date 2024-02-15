import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const useGetBeers = () => {
  const { authToken } = useAuth();
  const [beers, setBeers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBeers = async () => {
      try {
        const response = await fetch(
          'http://localhost:5000/beers?sortBy=breweryName',
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setBeers(data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBeers();
  }, [authToken]);

  return { beers, loading, error };
};

export default useGetBeers;
