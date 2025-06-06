const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#419488",
          light: "#d0e6e2",
        },
        secondary: {
          pink: "#F9B3D1",
          mauve: "#7F636E",
          yellow: "#F0BB69",
        },
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
      },
      animation: {
        'bounce-dot': 'bounce-dot 1.2s infinite',
      }
    },
  },
  plugins: [],
}
