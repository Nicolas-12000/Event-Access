import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        VITE_API_URL: 'http://localhost:8082',
        changeOrigin: true,
      },
    },
  },
});
