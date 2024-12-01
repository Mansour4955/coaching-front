/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        main_color: '#26619c',
        // main_color: '#fe300b',
        // main_color: "#f47628",
        white_color: "#dddddd",
        // white_color: '#f4f8ff',
      },
    },
  },
  plugins: [],
};
