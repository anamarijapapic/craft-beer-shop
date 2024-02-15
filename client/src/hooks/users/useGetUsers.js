import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';

const useGetUsers = () => {
  const { authToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [version, setVersion] = useState(0); // State to trigger refetch

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/users', {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        throw new Error('Failed to fetch users');
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [authToken]);

  const refetchUsers = useCallback(() => {
    setVersion((prevVersion) => prevVersion + 1); // Increment version to trigger refetch
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, version]); // Refetch when version changes

  return { users, loading, error, refetchUsers };
};

export default useGetUsers;
