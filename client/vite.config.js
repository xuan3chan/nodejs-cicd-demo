import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
  build: {
    // Tắt sourcemap cho production (giảm build time + size)
    sourcemap: false,
    // Code splitting thông minh
    rollupOptions: {
      output: {
        manualChunks: {
          // Tách vendor libs ra chunk riêng → cache lâu dài trên CDN/Browser
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-framer': ['framer-motion'],
        },
      },
    },
    // Giới hạn cảnh báo chunk size
    chunkSizeWarningLimit: 500,
  },
})
