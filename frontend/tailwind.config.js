/** @type {import('tailwindcss').Config} */
export default {
  content: [
  "./index.html",
  "./src/**/*.{js,jsx,ts,tsx}",
],
  theme: {
    extend: {
      colors: {
        'dark-navy': '#0a0f1c',
        'dark-card': '#131b2f',
        'electric-blue': '#0052FF',
        'electric-blue-hover': '#0040CC',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

