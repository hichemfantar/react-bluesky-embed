/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./theme.config.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: "class",
};
