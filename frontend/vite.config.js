import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: "/ReactGram",
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // URL do backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});



/*
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
*/