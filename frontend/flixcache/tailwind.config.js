/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/features/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#346680',
        'secondary': '#8A8A8A',
        'secbright': '#B3B3B3',
        'pribright': '#4A8CAD',
        'bg': '#1B1C1D',
        'headerbg': '#1E1E1F',
        'darkbg': '#121212',
      }
    },
  },
  plugins: [],
}

