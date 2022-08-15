/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'gray-500': '#F6F7F9',
        'gray-600': '#90A3BF',
        'gray-700': 'rgba(195, 212, 233, 0.4)',
        'blue-500': '#3563E9',
        black: '#111111',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
