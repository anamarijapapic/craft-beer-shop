import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const useDeleteUser = (id) => {
  const { authToken } = useAuth();
  const [error, setError] = useState(null);

  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (response.ok) {
        window.location.reload();
      } else {
        setError('Failed to delete user');
      }
    } catch (error) {
      setError(error);
    }
  };

  return { deleteUser, error };
};

export default useDeleteUser;
