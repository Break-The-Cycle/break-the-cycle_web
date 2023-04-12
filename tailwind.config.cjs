/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        main:"#FF82A7",
        SUB1:"#FFD1C1",
        SUB2:"#3B3866",
        BG_TEXT1:"#FFFFFF",
        BG_TEXT2:"#282828"

      }
    },
  },
  plugins: [],
});
