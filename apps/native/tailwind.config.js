import tailwindConfigBase from "../../packages/tailwind.config";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.js",
    "./app/**/*.{js,jsx,ts,tsx}",
    "../../packages/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [require("nativewind/preset"), tailwindConfigBase],
};
