const { content, theme, plugins } = require("tailwindcss");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF8343",
        secondary: "#F1DEC6",
        color: {
          50: "#FBF4EE",
          100: "#F9EDE0",
          200: "#F3DEC3",
          300: "#EDD1A7",
          400: "#E6C489",
          500: "#F1DEC6",
          600: "#C2A38E",
          700: "#927B66",
          800: "#63523F",
          900: "#312B1F",
        },
      },
    },
  },
  plugins: [],
};
