/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      maxHeight: {
        480: "480px",
      },
      height: {
        "screen-60px": "calc(100vh - 60.8px)",
        "screen-60px-72px": "calc(100vh - 60px - 72.8px)",
      },
      maxWidth: {
        "2/3": "66.666667%",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
