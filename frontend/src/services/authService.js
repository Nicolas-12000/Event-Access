// services/authService.js
import API from "./api";

export const login = async (credentials) => {
  // Placeholder for calling the backend login endpoint
  // const response = await API.post("/auth/login", credentials);
  // const token = response.data.token; // Assuming the backend returns a token

  console.log("Login called with:", credentials);
  // Simulate a successful login for now
  const token = "fake-jwt-token";
  localStorage.setItem('authToken', token); // Store the token
 return { token };
};

export const logout = async () => {
  localStorage.removeItem('authToken'); // Remove the token
  // Placeholder for calling the backend logout endpoint
  // const response = await API.post("/auth/logout");
  // return response.data;
  console.log("Logout called");
  // Simulate a successful logout for now
  return {};
};