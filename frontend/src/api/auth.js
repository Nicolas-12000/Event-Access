import api from './axiosInstance';

export const authService = {
  login: async (username, password) => {
    const response = await api.post('/auth/login', { username, password });
    return response.data;
  },
  
  logout: async () => {
    // If your backend requires a logout endpoint
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
  },
  
  validateToken: async () => {
    const response = await api.get('/auth/validate');
    return response.data;
  }
};