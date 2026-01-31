import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    host: true,
    allowedHosts: [
      '91d0be9b9152.ngrok-free.app'
    ],
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
})