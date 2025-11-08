import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'flowbite': ['flowbite-react'],
          'i18n': ['i18next', 'react-i18next']
        }
      }
    }
  },
  server: {
    host: true, // Allow access from network (mobile devices on same WiFi)
    port: 5173,
    open: true
  }
})
