import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,
    port: 5174,
    hmr: {
      protocol: 'ws',
      host: '127.0.0.1',
      clientPort: 5174,
    },
  },
  plugins: [react()],
})
