/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  prefix: "tw-",
  theme: {
    extend: {
      colors: {
        theme: {
          100: "rgba(00,255,00, 0.1)",
          200: "rgba(00,255,00, 0.2)",
          300: "rgba(00,255,00, 0.3)",
          400: "rgba(00,255,00, 0.4)",
          500: "rgba(00,255,00, 0.5)",
          600: "rgba(00,255,00, 0.6)",
          700: "rgba(00,255,00, 0.7)",
          800: "rgba(00,255,00, 0.8)",
          900: "rgba(00,255,00, 0.9)",
          1000: "rgba(00,255,00, 1)",
        }
      },
      spacing: {
        13: "52px"
      },
      fontSize:{
        themeFont: "24px"
      }
    },
  },
  plugins: [],
}

