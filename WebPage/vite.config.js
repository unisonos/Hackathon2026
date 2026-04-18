import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['.trycloudflare.com'],
    proxy: { // Can be temporal, this is just for tests
      '/paypal': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/db': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
