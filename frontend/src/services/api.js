// services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8082/api", // URL del backend
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para manejar errores globalmente
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Redirigir a login si hay error de autenticación
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default API;