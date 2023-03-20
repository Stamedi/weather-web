/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      white: '#f1f5f9',
      beige: '#FBE0C3',
      pink: '#FFBB98',
      grey: '#7d8E95',
      'dark-gray': '#344648',
      red: 'red'
    },
    extend: {
      textShadow: {
        DEFAULT: '#fff 1px 0 8px;',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      );
    }),
  ],
};
