import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/tak-nettsiden/',
  css: {
    modules: {
      localsConvention: 'camelCase',
      generateScopedName: '[name]_[local]__[hash:base64:5]'
    }
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    css: true,
    globals: true,
    exclude: ['**/node_modules/**', '**/tests/**']
  }
})
