import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';

const useGetBeers = () => {
  const { authToken } = useAuth();
  const [beers, setBeers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [version, setVersion] = useState(0); // State to trigger refetch

  const fetchBeers = useCallback(async () => {
    setLoading(true);
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
      } else {
        throw new Error('Failed to fetch beers');
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [authToken]);

  const refetchBeers = useCallback(() => {
    setVersion((prevVersion) => prevVersion + 1); // Increment version to trigger refetch
  }, []);

  useEffect(() => {
    fetchBeers();
  }, [fetchBeers, version]); // Refetch when version changes

  return { beers, loading, error, refetchBeers };
};

export default useGetBeers;
