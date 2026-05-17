/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0a',
        gold: {
          DEFAULT: '#97CCF6',
          light: '#c4e3fa',
        },
        'dark-100': '#1a1a1a',
        'dark-200': '#141414',
      },
      fontFamily: {
        display: ['var(--font-display)', 'serif'],
        cormorant: ['var(--font-cormorant)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
