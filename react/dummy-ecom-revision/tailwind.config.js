/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      spacing:{
        13: "1000px"
      },
      colors:{
        'ali': {
          100: "#05050d",
          200: "#05051d",
          300: "#00FF00"
        }
      }
    },
  },
  plugins: [],
}

