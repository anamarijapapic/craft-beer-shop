import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const usePutUser = (id, userData) => {
  const { authToken } = useAuth();
  const [error, setError] = useState(null);

  const putUser = async (id, userData) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        window.location.reload();
      } else {
        setError('Failed to update user');
      }
    } catch (error) {
      setError(error);
    }
  };

  return { putUser, error };
};

export default usePutUser;
