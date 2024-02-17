import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const useChangePassword = () => {
  const { authToken } = useAuth();
  const [error, setError] = useState(null);

  const changePassword = async (id, passwordData) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${id}/change-password`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(passwordData),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to change password');
      }
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  return { changePassword, error };
};

export default useChangePassword;
