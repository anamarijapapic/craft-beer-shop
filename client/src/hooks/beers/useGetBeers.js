import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';

const useGetBeers = () => {
  const { authToken } = useAuth();
  const [beers, setBeers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [version, setVersion] = useState(0); // State to trigger refetch
  const [sortBy, setSortBy] = useState(''); // State for sorting by price

  const fetchBeers = useCallback(async () => {
    setLoading(true);
    try {
      let url = `${process.env.REACT_APP_API_URL}/beers?sortBy=breweryName&sortOrder=asc`; // Default sorting by breweryName

      if (sortBy === 'price_asc') {
        url = `${process.env.REACT_APP_API_URL}/beers?sortBy=price&sortOrder=asc`;
      } else if (sortBy === 'price_desc') {
        url = `${process.env.REACT_APP_API_URL}/beers?sortBy=price&sortOrder=desc`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
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
  }, [authToken, sortBy]);

  const refetchBeers = useCallback(() => {
    setVersion((prevVersion) => prevVersion + 1); // Increment version to trigger refetch
  }, []);

  useEffect(() => {
    fetchBeers();
  }, [fetchBeers, version]); // Refetch when version changes

  return { beers, loading, error, refetchBeers, setSortBy };
};

export default useGetBeers;
