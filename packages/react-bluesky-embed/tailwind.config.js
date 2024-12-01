/** @type {import('tailwindcss').Config} */
export default {
  // prefix: 'bsky-', // Add this line
  darkMode: ["selector", "#bluesky-embed.dark"],
  // darkMode: ["selector", "[data-theme="dark"],.dark"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    // './node_modules/react-bluesky-embed/**/*.{vue,js,ts,jsx,tsx}', // Add this line
  ],
  theme: {
    extend: {
      // colors: ({ theme }) => ({
      //   ...colors,
      //   headline: theme.,
      // }),

      colors: {
        brand: "rgb(10,122,255)",
        brandDark: "#3399FF",
        textLight: "rgb(66,87,108)",
        textDark: "#8c9eb2",
      },
    },
  },
  plugins: [],
  // https://tailwindcss.com/docs/configuration#important
  // TODO: outside styles with important will override those inside the important component
  important: "#bluesky-embed",
};
