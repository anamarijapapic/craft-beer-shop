import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const useGetBrewery = (id) => {
  const { authToken } = useAuth();
  const [brewery, setBrewery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const response = await fetch(`http://localhost:5000/breweries/${id}`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setBrewery(data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBreweries();
  }, [id, authToken]);

  return { brewery, loading, error };
};

export default useGetBrewery;
