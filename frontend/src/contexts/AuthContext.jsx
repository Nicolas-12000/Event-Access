import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as authLogin, logout as authLogout } from '../services/authService'; // Import login/logout from authService

// Create the AuthContext
const AuthContext = createContext(null);

// Create a provider component
export const AuthProvider = ({ children }) => {
  // State to hold authentication status
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // State to indicate if the initial authentication check is in progress
  const [isLoading, setIsLoading] = useState(true);

  // Effect to check authentication status on initial load
  useEffect(() => {
    // TODO: Implement a more robust check for authentication status (e.g., check for a valid token in local storage or cookies)
    // Assumption: authService.isAuthenticated() would check for a valid token
    const checkAuthStatus = async () => {
      // Simulate an async check
      await new Promise(resolve => setTimeout(resolve, 100)); // Simulate async operation
      const token = localStorage.getItem('authToken'); // Example: Check local storage for a token
      setIsAuthenticated(!!token); // Set authenticated based on token presence
      setIsLoading(false); // Authentication check is complete
    };

    checkAuthStatus();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Login function
  const login = async (username, password) => {
    setIsLoading(true); // Set loading state during login
    try {
      // Call the login function from authService
      // TODO: Replace with actual API call to your backend's login endpoint
      const success = await authLogin(username, password); // Assumption: authLogin returns true on success
      if (success) {
        setIsAuthenticated(true);
      } else {
        // Handle login failure (e.g., incorrect credentials)
        console.error('Login failed in AuthContext');
        setIsAuthenticated(false);
        throw new Error('Login failed'); // Propagate the error
      }
    } catch (error) {
      console.error('Error during login:', error);
      setIsAuthenticated(false);
      throw error; // Re-throw the error for the component to handle
    } finally {
      setIsLoading(false); // Clear loading state after login attempt
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true); // Set loading state during logout
    try {
      // Call the logout function from authService
      // TODO: Replace with actual API call to your backend's logout endpoint (if any)
      await authLogout(); // Assumption: authLogout handles token removal

      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error during logout:', error);
      // Even if logout fails on the backend, we should ideally clear the local auth state
      setIsAuthenticated(false);
      // Optionally, throw the error if you want to handle it in the component
    } finally {
      setIsLoading(false); // Clear loading state after logout attempt
    }
  };

  // Provide the authentication state and functions to the components
  const value = {
    isAuthenticated,
    isLoading, // Provide loading state as well
    login,
    logout,
  };

  // Render the children components wrapped with the provider
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
