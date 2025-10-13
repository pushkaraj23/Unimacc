/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: "#DD7427",   // main brand orange
        primary: "#1A1A1A", // main dark color
        mute: "#F5F5F5",    // light gray / background
      },
    },
  },
  plugins: [],
};
