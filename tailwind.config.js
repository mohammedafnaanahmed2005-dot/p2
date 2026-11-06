/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        display: ["Manrope", "sans-serif"],
        mono: ["DM Mono", "monospace"],
      },
      colors: {
        ink: "#09090f",
        violet: "#9b8cff",
        lavender: "#c5bdff",
      },
    },
  },
  plugins: [],
};
