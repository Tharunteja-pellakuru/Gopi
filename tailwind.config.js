/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          50: '#fff3ea',
          100: '#ffe4d0',
          200: '#ffc5a0',
          300: '#ffa160',
          400: '#ff7c10',
          500: '#fc6f03',
          600: '#fc6f03',
          700: '#d35c02',
          800: '#aa4a01',
          900: '#8b3d01',
          950: '#522000',
        },
        emerald: {
          50: '#fff3ea',
          100: '#ffe4d0',
          200: '#ffc5a0',
          300: '#ffa160',
          400: '#ff7c10',
          500: '#fc6f03',
          600: '#fc6f03',
          700: '#d35c02',
          800: '#aa4a01',
          900: '#8b3d01',
          950: '#522000',
        },
        background: {
          dark: '#FFFFFF',
          deep: '#FFFFFF',
          card: '#FFFFFF',
          panel: '#FFFFFF',
        },
        accent: {
          purple: '#fc6f03',
          blue: '#fc6f03',
          red: '#fc6f03',
          orange: '#ffc5a0',
          violet: '#fc6f03',
        }
      },
      fontFamily: {
        clash: ['"Clash Display"', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif'],
        general: ['"General Sans"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      }
    },
  },
  plugins: [],
}
