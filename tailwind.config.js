/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        vision: {
          green: '#A6FF00',
          deep: '#4E7600',
          black: '#10130E',
          ink: '#252A21',
          gray: '#697064',
          light: '#F4F7EF',
          line: '#DDE4D7',
        },
      },
      fontFamily: {
        display: ['system-ui', 'sans-serif'],
        body: ['system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
