import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const useDeleteUser = () => {
  const { authToken } = useAuth();
  const [error, setError] = useState(null);

  const deleteUser = async (id, refetchUsers) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
      refetchUsers(); // Trigger refetch after deleting the user
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  return { deleteUser, error };
};

export default useDeleteUser;
