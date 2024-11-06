/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
        colors: {
          primary: '#0fa968',  
          secondary: {
            DEFAULT: "#4287f5",
            100: "#4287f5",
            200: "#366ec7",
          },
          black: {
            DEFAULT: "#000",
            100: "#1E1E2D",
            200: "#232533",
          },
          gray: {
            100: "#CDCDEO",
          },
          jade: {
              '50': '#effef7',
              '100': '#dafeef',
              '200': '#b8fadd',
              '300': '#81f4c3',
              '400': '#43e5a0',
              '500': '#1acd81',
              '600': '#0fa968',
              '700': '#108554',
              '800': '#126945',
              '900': '#11563a',
              '950': '#03301f',
          },
        }
    },
  },
  plugins: [],
}