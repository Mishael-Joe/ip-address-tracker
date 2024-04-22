/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'Very-Dark-Gray': 'hsl(0, 0%, 17%)',
      'Dark-Gray': 'hsl(0, 0%, 59%)',
      'Very-Pale-Red': 'hsl(13, 100%, 96%)',
      'Very-Light-Gray': 'hsl(0, 0%, 98%)',
      'hover-text': 'hsl(12, 93%, 73%)',
    },
    extend: {},
  },
  plugins: [],
}

