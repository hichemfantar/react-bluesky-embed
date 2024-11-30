module.exports = {
  syntax: "postcss-scss",
  plugins: {
    "postcss-import": {},
    // 'tailwindcss/nesting': 'postcss-nesting',
    // require('postcss-nested'),
    "postcss-nested": {},
    // 'postcss-nesting': {},
    // 'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
