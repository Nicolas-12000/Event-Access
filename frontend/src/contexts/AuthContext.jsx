import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as authLogin, logout as authLogout } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const checkAuthStatus = async () => {
      await new Promise(resolve => setTimeout(resolve, 100)); 
      const token = localStorage.getItem('authToken'); 
      setIsAuthenticated(!!token); 
      setIsLoading(false); 
    };

    checkAuthStatus();
  }, []); 

  const login = async (username, password) => {
    setIsLoading(true); 
    try {
      const { token } = await authLogin({ username, password });
      if (token) {
        setIsAuthenticated(true);
      } else {
        console.error('Login failed in AuthContext');
        setIsAuthenticated(false);
        throw new Error('Login failed'); 
      }
    } catch (error) {
      console.error('Error during login:', error);
      setIsAuthenticated(false);
      throw error; 
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authLogout(); 

      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error during logout:', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false); 
    }
  };

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
