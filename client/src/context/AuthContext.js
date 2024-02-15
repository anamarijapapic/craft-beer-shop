import React, { createContext, useContext, useState } from 'react';
import { useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    JSON.parse(localStorage.getItem('user'))
  );
  const [authToken, setAuthToken] = useState(() =>
    localStorage.getItem('authToken')
  );

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const authToken = localStorage.getItem('authToken');
    if (user && authToken) {
      setUser(user);
      setAuthToken(authToken);
    }
  }, []);

  const login = (userData) => {
    setUser(userData.user);
    setAuthToken(userData.token);
    localStorage.setItem('user', JSON.stringify(userData.user)); // Save user to local storage
    localStorage.setItem('authToken', userData.token); // Save token to local storage
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null);
    localStorage.removeItem('user'); // Remove user from local storage
    localStorage.removeItem('authToken'); // Remove token from local storage
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, authToken, setAuthToken, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
