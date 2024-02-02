/** @type {import('tailwindcss').Config} */
import darkimg from '/src/assets/dark.jpj'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'husk': '#B7A458',
        'mirage':'#161928'
      },
      backgroundImage: {
        'dark-logo': "url(darkim)",
        'light-logo': "url('/src/assets/light.jpj')",
      }
    },
  },
  plugins: [],
}