import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
      environment: 'jsdom',
      setupFiles: ['./tests/setup.js'],
      testMatch: ['./tests/**/*.test.jsx'],
      globals: true
    },

  build: {
    rollupOptions: {
        output:{
            manualChunks(id) {
                if (id.includes('node_modules')) {
                    return id.toString().split('node_modules/')[1].split('/')[0].toString();
                }
            }
        }
    }
  }
})
