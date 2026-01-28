import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const spaFallback = () => {
  return {
    name: 'spa-fallback',
    configureServer(server) {
      return () => {
        server.middlewares.use((req, res, next) => {
          // Skip if the request is for a file (has an extension) or is the root
          if (!req.url.includes('.') && req.url !== '/') {
            req.url = '/index.html'
          }
          next()
        })
      }
    }
  }
}

export default defineConfig({
  plugins: [react(), spaFallback()],
  base: '/web-tools/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        json: path.resolve(__dirname, 'json.html'),
        base64: path.resolve(__dirname, 'base64.html'),
        javascript: path.resolve(__dirname, 'javascript.html'),
        css: path.resolve(__dirname, 'css.html'),
        jwt: path.resolve(__dirname, 'jwt.html'),
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
