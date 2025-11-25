/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ===== 1. FONTS (Mises à jour pour correspondre à Fontsource) =====
      fontFamily: {
        // "Inter Tight" est ta nouvelle police principale (Look Tech/Apple)
        sans: ['"Inter Tight"', 'system-ui', '-apple-system', 'sans-serif'],
        // "JetBrains Mono" pour le code et les détails techniques
        mono: ['"JetBrains Mono"', 'monospace'],
      },

      // ===== 2. COULEURS BRAND INTELLO =====
      colors: {
        tech: {
          black: '#050505', // Le nouveau fond ultra-sombre
          surface: '#0A0A0A', // Pour les cartes
        },
        brand: {
          black: '#000000',
          white: '#FFFFFF',
          gray: {
            50: '#F9FAFB',
            100: '#F3F4F6',
            200: '#E5E7EB',
            300: '#D1D5DB',
            400: '#9CA3AF',
            500: '#6B7280',
            600: '#4B5563',
            700: '#374151',
            800: '#1F2937',
            900: '#111827',
            950: '#030712',
          },
          blue: {
            400: '#60A5FA',
            500: '#3B82F6',
            600: '#2563EB',
            700: '#1D4ED8',
          },
          purple: {
            400: '#C084FC',
            500: '#A855F7',
            600: '#9333EA',
            700: '#7E22CE',
          },
          pink: {
            400: '#F472B6',
            500: '#EC4899',
            600: '#DB2777',
          },
          cyan: {
            400: '#22D3EE',
            500: '#06B6D4',
            600: '#0891B2',
          },
        },
      },

      // ===== BREAKPOINTS CUSTOM =====
      screens: {
        'xs': '375px',
        '3xl': '1920px',
      },

      // ===== 3. ANIMATIONS (Ajout du Marquee pour le Hero) =====
      keyframes: {
        // Nouveau : Effet de défilement infini (Bandeau bas)
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }, // Défile jusqu'à la moitié (contenu dupliqué)
        },
        // Tes anciennes animations (conservées pour compatibilité)
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        gentleFloat: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      animation: {
        marquee: 'marquee 25s linear infinite', // Pour le Hero (rapide)
        'marquee-slow': 'marquee 40s linear infinite', // ✅ NOUVEAU : Pour le TechStack (plus lent, plus lisible)
        slideUp: 'slideUp 0.6s ease-out forwards',
        fadeIn: 'fadeIn 0.6s ease-out forwards',
        gentleFloat: 'gentleFloat 3s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },

      // ===== SPACING =====
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },

      // ===== BOX SHADOWS =====
      boxShadow: {
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.5)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.5)',
      },
    },
  },
  plugins: [],
}