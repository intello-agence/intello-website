// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Alias pour imports simplifiés
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@data': path.resolve(__dirname, './src/data'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@pages': path.resolve(__dirname, './src/pages'),
    }
  },

  // Optimisations build production
  build: {
    // Chunks manuels pour meilleure mise en cache
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendors React (change rarement)
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          
          // Librairies UI (change rarement)
          'ui-libs': ['framer-motion', 'lucide-react', 'yet-another-react-lightbox'],
          
          // EmailJS (isolé)
          'emailjs': ['@emailjs/browser'],
        },
        
        // Nommage des chunks pour cache busting
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      }
    },
    
    // Limite de warning pour chunks (1MB = raisonnable pour vendors)
    chunkSizeWarningLimit: 1000,
    
    // Minification (esbuild = plus rapide, terser = plus petit)
    minify: 'esbuild', // Changez en 'terser' si vous voulez build plus petit
    
    // Source maps (false en production pour sécurité)
    sourcemap: false,
    
    // Optimisations CSS
    cssCodeSplit: true,
    cssMinify: true,
  },

  // Configuration serveur dev
  server: {
    port: 5173,
    strictPort: false,
    open: false, // N'ouvre pas automatiquement le navigateur
    cors: true,
  },

  // Preview (après build)
  preview: {
    port: 4173,
    strictPort: false,
    open: false,
  },

  // Optimisations dépendances
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react',
    ],
  },
})