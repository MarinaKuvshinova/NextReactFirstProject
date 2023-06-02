/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        fire: "#dc2626",
        water: "#1d4ed8",
        grass: "#dbeafe",
        normal: "#fff7ed",
        bug: "#09090b",
        lightGrey: "#ececec",
        lightGreen: "#9fd3c7",
        grey: "#385170",
        darkGrey: "#142d4c",
        lightGrey65: "rgba(236, 236, 236, .65)",
      },
      backgroundImage: {
        "gradient-112":
          "linear-gradient(112.1deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%)",
        "gradient-111":
          "linear-gradient(135deg, #f0f9ff 0%,#cbebff 47%,#9fd3c7 100%)",
      },
      boxShadow: {
        custom: "0 0 30px rgba(159, 211, 199, 0.3)",
      },
      gridTemplateColumns: {
        info: "100px auto",
      },
      transitionProperty: {
        shape: "height, width",
      },
    },
  },
  plugins: [],
};
