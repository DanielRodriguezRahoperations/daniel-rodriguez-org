/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        gold: {
          DEFAULT: '#c9a96e',
          light: '#e8d5a3',
        },
        'dark-100': '#1a1a1a',
        'dark-200': '#141414',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
