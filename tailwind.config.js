/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin'; // Ensure this import is present

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        english: ['Space Grotesk', 'sans-serif'],
        bulgarian: ['bulgarian', 'sans-serif']
      },
      boxShadow: {
          'cube': '0 0 0 2em orange inset, 0 0 50px 10px blue inset'
      },
      keyframes: {
        gradient: {
          '50%': { transform: 'scale(1.3) translate(75px)' },
        },
        rotate: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
      },
      animation: {
        gradient: 'gradient 5s infinite',
        rotate: 'rotate 15s linear infinite',
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