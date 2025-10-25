/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ===== COULEURS BRAND INTELLO =====
      colors: {
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

      // ===== FONTS =====
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Fira Code', 'Consolas', 'Monaco', 'monospace'],
      },

      // ===== BREAKPOINTS CUSTOM (optionnel) =====
      screens: {
        'xs': '375px',    // Petit mobile
        '3xl': '1920px',  // Grand écran
      },

      // ===== ANIMATIONS CUSTOM =====
      keyframes: {
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
        slideUp: 'slideUp 0.6s ease-out forwards',
        fadeIn: 'fadeIn 0.6s ease-out forwards',
        gentleFloat: 'gentleFloat 3s ease-in-out infinite',
        shimmer: 'shimmer 2s linear infinite',
      },

      // ===== SPACING (optionnel) =====
      spacing: {
        '18': '4.5rem',   // 72px
        '88': '22rem',    // 352px
        '128': '32rem',   // 512px
      },

      // ===== TRANSITIONS =====
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },

      // ===== BOX SHADOWS =====
      boxShadow: {
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.5)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.5)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.5)',
      },

      // ===== BACKDROP BLUR =====
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}