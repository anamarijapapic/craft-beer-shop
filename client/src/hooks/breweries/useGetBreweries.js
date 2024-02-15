import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';

const useGetBreweries = () => {
  const { authToken } = useAuth();
  const [breweries, setBreweries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [version, setVersion] = useState(0); // State to trigger refetch

  const fetchBreweries = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/breweries', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setBreweries(data);
      } else {
        throw new Error('Failed to fetch breweries');
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [authToken]);

  const refetchBreweries = useCallback(() => {
    setVersion((prevVersion) => prevVersion + 1); // Increment version to trigger refetch
  }, []);

  useEffect(() => {
    fetchBreweries();
  }, [fetchBreweries, version]); // Refetch when version changes

  return { breweries, loading, error, refetchBreweries };
};

export default useGetBreweries;
