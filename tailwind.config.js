/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        persona: {
          red: "#E60012",
          darkRed: "#99000C",
          black: "#111111",
          grey: "#1A1A1A",
          lightGrey: "#2A2A2A",
          white: "#FFFFFF",
          yellow: "#FFCC00"
        }
      },
      fontFamily: {
        persona: ["Persona Aura", "sans-serif"]
      }
    },
  },
  plugins: [],
}
