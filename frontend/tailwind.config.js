const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/@vechaiui/**/*.{js,ts,jsx,tsx}', // path to vechaiui
    './public/index.html',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@vechaiui/core')({
      colors: ['red'],
    }),
  ],
}
