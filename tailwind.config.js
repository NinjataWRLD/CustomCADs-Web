/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'; // Ensure this import is present

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        gradient: {
          '50%': { transform: 'scale(1.3) translate(75px)' },
        },
      },
      animation: {
        gradient: 'gradient 4s infinite',
      },
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.after-blur': {
          position: 'relative',
        },
        '.after-blur::after': {
          content: "''",
          position: 'absolute',
          top: '0',
          left: '0',
          height: '100%',
          width: '100%',
          backdropFilter: 'blur(200px)',
          zIndex: '1',
        },
      }, ['responsive', 'hover']);
    }),
  ],
}