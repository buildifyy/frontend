/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        popup: "#2F2F2F",
      },
    },
  },
  plugins: [],
  important: true,
};
