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
  base: './web-tools',
  build: {
    outDir: 'dist'
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
