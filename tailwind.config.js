/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          0: '#000000',
          950: '#050505',
          900: '#0A0A0A',
          800: '#101010',
          700: '#171717',
          600: '#1F1F1F',
          500: '#2A2A2A',
        },
        pearl: {
          0: '#FFFFFF',
          50: '#FAFAFA',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
        },
        silver: {
          DEFAULT: '#C8C9CB',
          dark: '#8A8B8E',
          light: '#E8E8EA',
        },
        gold: {
          50: '#FBF7EF',
          100: '#F5EBD8',
          200: '#E9D5AE',
          300: '#D9B97C',
          400: '#C9A259',
          500: '#B8924A',
          600: '#9A7839',
          700: '#7A5D2E',
          800: '#5C4724',
          900: '#3F311A',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'ui-serif', 'Georgia', 'serif'],
      },
      letterSpacing: {
        ultra: '0.5em',
        widest2: '0.25em',
      },
      transitionTimingFunction: {
        cinematic: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        scrollLine: {
          '0%': { transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%': { transform: 'scaleY(1)', transformOrigin: 'top' },
          '51%': { transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-120%) skewX(-12deg)' },
          '100%': { transform: 'translateX(220%) skewX(-12deg)' },
        },
      },
      animation: {
        scrollLine: 'scrollLine 2.6s ease-in-out infinite',
        shimmer: 'shimmer 1.4s ease-in-out',
      },
    },
  },
  plugins: [],
};
