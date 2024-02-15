import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const usePostLogin = (email, password) => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const postLogin = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        login(data);
        navigate('/');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError(error);
    }
  };

  return { postLogin, error };
};

export default usePostLogin;
