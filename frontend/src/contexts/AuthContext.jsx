import { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const validateToken = async (token) => {
    try {
      const response = await axios.get('http://localhost:8082/api/auth/validate', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data.valid;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        const isValid = await validateToken(storedToken);
        if (isValid) {
          setToken(storedToken);
          setUser({ username: localStorage.getItem('username') || 'Admin' });
        } else {
          logout();
        }
      }
      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (newToken, username) => {
    try {
      const isValid = await validateToken(newToken);
      if (isValid) {
        localStorage.setItem('token', newToken);
        localStorage.setItem('username', username);
        setToken(newToken);
        setUser({ username });
        setError(null);
      } else {
        throw new Error('Invalid token received');
      }
    } catch (error) {
      setError('Login failed: ' + error.message);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null);
    setUser(null);
    setError(null);
  };

  const checkAuthStatus = async () => {
    if (token) {
      const isValid = await validateToken(token);
      if (!isValid) {
        logout();
      }
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        token, 
        user, 
        isLoading, 
        error,
        login, 
        logout,
        checkAuthStatus 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};