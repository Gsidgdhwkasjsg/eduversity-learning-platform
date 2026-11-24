/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        fest: {
          dark: '#06040a',
          card: '#0e0a1a',
          cardHover: '#161028',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(255, 0, 122, 0.35)',
          purple: {
            DEFAULT: '#7928CA',
            dark: '#1d0b38',
            deep: '#120724',
            light: '#9d4edd',
            glow: 'rgba(121, 40, 202, 0.4)'
          },
          cyan: {
            DEFAULT: '#00F0FF',
            deep: '#005b66',
            light: '#70f9ff',
            glow: 'rgba(0, 240, 255, 0.4)'
          },
          pink: {
            DEFAULT: '#FF007A',
            deep: '#6b0033',
            light: '#ff54a2',
            glow: 'rgba(255, 0, 122, 0.4)'
          },
          yellow: {
            DEFAULT: '#FFE600',
            glow: 'rgba(255, 230, 0, 0.4)'
          }
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace']
      },
      boxShadow: {
        'glow-cyan': '0 0 25px rgba(0, 240, 255, 0.35), 0 0 50px rgba(0, 240, 255, 0.15)',
        'glow-pink': '0 0 25px rgba(255, 0, 122, 0.35), 0 0 50px rgba(255, 0, 122, 0.15)',
        'glow-purple': '0 0 25px rgba(121, 40, 202, 0.4), 0 0 60px rgba(121, 40, 202, 0.2)',
        'glow-mixed': '0 0 30px rgba(255, 0, 122, 0.3), 0 0 60px rgba(0, 240, 255, 0.2)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'marquee': 'marquee 25s linear infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
