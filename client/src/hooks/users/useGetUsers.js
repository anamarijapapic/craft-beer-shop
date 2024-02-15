import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const useGetUsers = () => {
  const { authToken } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/users', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [authToken]);

  return { users, loading, error };
};

export default useGetUsers;
