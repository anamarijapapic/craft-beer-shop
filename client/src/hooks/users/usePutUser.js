import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const usePutUser = () => {
  const { authToken } = useAuth();
  const [error, setError] = useState(null);

  const putUser = async (id, userData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  return { putUser, error };
};

export default usePutUser;
