// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         theme: "#ef790b", // main brand orange
//         primary: "#263243", // main dark color
//         mute: "#e8e4de", // light gray / background
//       },
//     },
//   },
//   plugins: [require("@tailwindcss/typography")],
// };

import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        theme: "#ef790b",
        primary: "#263243",
        mute: "#e8e4de",
      },
    },
  },
  plugins: [typography],
};
