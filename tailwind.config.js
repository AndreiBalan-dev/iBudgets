/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        hslblack: "#111c1d",
        hslwarning: "#df6b62",
        hslred: "#d22d2d",
        electric_blue: "#1DBCC3",
      },
      fontSize: {
        "7.5xl": ["5.70rem", "1"],
      },
    },
  },
  plugins: [],
};
