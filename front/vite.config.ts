import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, '../shared'),
      '@pictures': path.resolve(__dirname, './src/assets/pictures'),
      "@components": path.resolve(__dirname, './src/components'),
      "@hook": path.resolve(__dirname, './src/hook'),
      "@pages": path.resolve(__dirname, './src/pages'),
      "@utils": path.resolve(__dirname, './src/utils'),
      "@srcFront": path.resolve(__dirname, './src'),
    },
  },
  server: {
    fs: {
      allow: ['..'],
    },
  },
})
