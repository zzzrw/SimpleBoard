/** @type {import('tailwindcss').Config} */
export default {
    mode: "jit",
  content: [
      "./src/pages/*.jsx",
      "./src/components/*.jsx",
      "./src/components/**/*.jsx",
      "./src/App.jsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

