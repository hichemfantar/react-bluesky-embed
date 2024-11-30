/** @type {import('tailwindcss').Config} */
export default {
  prefix: "bsky-", // Add this line
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    // './node_modules/react-bluesky-embed/**/*.{vue,js,ts,jsx,tsx}', // Add this line
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
