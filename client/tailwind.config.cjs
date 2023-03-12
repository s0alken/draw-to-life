/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#c4ef12'
      },
      cursor: {
        pencil: 'url(../src/assets/pencil.svg), auto',
        eraser: 'url(../src/assets/eraser.svg), auto'
      }
    },
  },
  plugins: [],
}
