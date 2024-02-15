import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const useGetBreweries = () => {
  const { authToken } = useAuth();
  const [breweries, setBreweries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBreweries = async () => {
      try {
        const response = await fetch('http://localhost:5000/breweries', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setBreweries(data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchBreweries();
  }, [authToken]);

  return { breweries, loading, error };
};

export default useGetBreweries;
