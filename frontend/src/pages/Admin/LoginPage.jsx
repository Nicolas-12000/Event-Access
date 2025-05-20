import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Adjust the import path if necessary

function LoginPage() {
  // Initialize react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();
  // Hook for programmatic navigation
  const navigate = useNavigate();
  // Hook to access the current location's state (for redirection after login)
  const location = useLocation();
  // Access the login function from the authentication context
  const { login } = useAuth();

  // Function to handle form submission
  const onSubmit = async (data) => {
    try {
      // Call the login function from AuthContext with username and password
      await login(data.username, data.password);

      // After successful login, redirect the user.
      // Check if there's a 'from' state in the location (meaning the user was redirected here)
      // If a 'from' state exists, redirect to that path, otherwise redirect to the admin dashboard.
      const from = location.state?.from?.pathname || '/admin';
      navigate(from, { replace: true }); // Use replace: true to prevent going back to login

    } catch (error) {
      // Handle login errors (e.g., incorrect credentials, network issues)
      console.error('Login failed:', error);
      // TODO: Implement a user-friendly way to display login errors in the UI
      // You could use a state variable to store the error message and display it below the form.
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            {...register('username', { required: 'Username is required' })}
          />
          {/* Display username validation error */}
          {errors.username && <p style={{ color: 'red' }}>{errors.username.message}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            {...register('password', { required: 'Password is required' })}
          />
          {/* Display password validation error */}
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
        </div>
        {/* TODO: Add a loading indicator here while login is in progress */}
        {/* You can get the isLoading state from the useAuth hook and conditionally render a loading message or spinner */}
        <button type="submit">Login</button>
      </form>
      {/* TODO: Display a general login error message here if login fails */}
      {/* You could use a state variable in this component to store and display the error */}
    </div>
  );
}

export default LoginPage;
