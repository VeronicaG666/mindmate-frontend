import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:5000'
    }
  },
  resolve: {
    alias: {
      '@emotion/react': path.resolve(__dirname, 'node_modules/@emotion/react'),
    },
  }
})
