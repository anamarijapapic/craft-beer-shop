import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const usePostRegister = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const postRegister = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        return navigate('/login');
      } else {
        setError('Registration failed.');
      }
    } catch (error) {
      setError(error);
    }
  };

  return { postRegister, error };
};

export default usePostRegister;
