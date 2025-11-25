import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    // Création des versions compressées .gz et .br (Brotli est 15-20% meilleur que Gzip)
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024, // Ne compresse pas les fichiers < 1kb (contre-productif)
      deleteOriginFile: false
    }),
    viteCompression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false
    }),
  ],
  
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

  build: {
    // Cible les navigateurs modernes (moins de polyfills = code plus léger)
    target: 'es2020',
    
    // Passage à terser pour une minification plus agressive
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Supprime tous les console.log automatiquement
        drop_debugger: true,
        pure_funcs: ['console.info', 'console.debug', 'console.warn'],
      },
      format: {
        comments: false, // Supprime tous les commentaires
      },
    },

    rollupOptions: {
      output: {
        manualChunks(id) {
          // 1. Cœur React (Critique)
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/scheduler')) {
            return 'react-core';
          }

          // 2. React Router (Navigation)
          if (id.includes('react-router')) {
            return 'react-router';
          }

          // 3. Framer Motion (Lourd ! On l'isole pour qu'il ne bloque pas l'affichage initial des icônes)
          if (id.includes('framer-motion')) {
            return 'anim-framer';
          }

          // 4. UI Légère (Icônes, etc - Doit charger vite)
          if (id.includes('lucide-react') || id.includes('clsx') || id.includes('tailwind-merge')) {
            return 'ui-utils';
          }

          // 5. Lightbox & autres libs visuelles secondaires
          if (id.includes('yet-another-react-lightbox')) {
            return 'ui-lightbox';
          }
          
          // 6. Le reste des node_modules
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      }
    },
    
    chunkSizeWarningLimit: 800,
    sourcemap: false, // Toujours false en prod
    cssCodeSplit: true,
    cssMinify: true,
  },

  server: {
    port: 5173,
    strictPort: false,
    open: false,
    cors: true,
  },

  preview: {
    port: 4173,
    strictPort: false,
    open: false,
  },
})