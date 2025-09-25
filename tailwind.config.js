/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './src/components/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: "#FC3060",
      },
      keyframes: {
         shine: {
           '0%': { 'background-position': '100%' },
           '100%': { 'background-position': '-100%' },
         },
       },
       animation: {
         shine: 'shine 5s linear infinite',
       },
    },
  },
  plugins: [],
}