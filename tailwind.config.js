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
          surfaceCard: '#1B2017',
          ink: '#252A21',
          gray: '#485243',
          grayLight: '#697064',
          light: '#F4F7EF',
          line: '#DDE4D7',
          error: '#C5221F',
          errorBg: '#FDF2F2',
          success: '#1B7339',
          successBg: '#F3FAF7',
          warning: '#9E6000',
          warningBg: '#FFFBEB',
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
