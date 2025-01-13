/* eslint-disable no-undef */
import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors:{
        "custom-yellow": "rgba(255, 250, 0, 0.8)"
      },
      fontFamily:{
        custom:["DM Serif Text", "serif"],
      }
    },
  },
  plugins: [
    require('daisyui'),
    flowbite.plugin(),
  ],
  daisyui: {
    themes: ["light"],
  },
}