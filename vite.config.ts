import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Set to the port you want, e.g., 3000
    host: 'localhost', // Use '0.0.0.0' if accessed on other devices
    strictPort: true, // Fail if the port is unavailable
    hmr: {
      protocol: 'ws', // Use 'ws' for HTTP or 'wss' for HTTPS
    },
  },
});

