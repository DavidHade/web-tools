import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const spaFallback = () => {
  return {
    name: 'spa-fallback',
    configureServer(server) {
      return () => {
        server.middlewares.use((req, res, next) => {
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
  base: '/',
  build: {
    outDir: 'dist',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
        passes: 2,
      },
      mangle: {
        properties: {
          regex: /^_/,
        },
      },
      output: {
        comments: false,
      },
    },
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        json: path.resolve(__dirname, 'json.html'),
        base64: path.resolve(__dirname, 'base64.html'),
        javascript: path.resolve(__dirname, 'javascript.html'),
        css: path.resolve(__dirname, 'css.html'),
        xml: path.resolve(__dirname, 'xml.html'),
        qr: path.resolve(__dirname, 'qr.html'),
        pdf: path.resolve(__dirname, 'pdf.html'),
        jwt: path.resolve(__dirname, 'jwt.html'),
      },
      output: {
        manualChunks(id) {
          // Split pdf-lib operations
          if (id.includes('node_modules/pdf-lib')) {
            return 'vendor-pdf-lib'
          }
          // Split pdfjs rendering into smaller chunks
          if (id.includes('node_modules/pdfjs-dist')) {
            // Further split pdfjs based on file size
            if (id.includes('pdfjs-dist/build/pdf.js')) {
              return 'vendor-pdfjs-core'
            }
            if (id.includes('pdfjs-dist/build/pdf.worker')) {
              return 'vendor-pdfjs-worker'
            }
            return 'vendor-pdfjs'
          }
          // Split docx
          if (id.includes('node_modules/docx')) {
            return 'vendor-docx'
          }
          // Split other vendor dependencies
          if (id.includes('node_modules/')) {
            return 'vendor'
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
