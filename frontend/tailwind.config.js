/** @type {import('tailwindcss').Config} */
export default {
    mode: "jit",
  content: [
      "./src/pages/*.{jsx, html, js, ts, tsx}",
      "./src/components/*.{jsx, html, js, ts, tsx}" ,
      "./src/App.jsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

