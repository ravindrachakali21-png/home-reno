/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#fdf6ee', 100: '#f9e8d1', 200: '#f2cfa0', 300: '#eab165',
          400: '#e3923a', 500: '#d97418', 600: '#c05c12', 700: '#9e4411',
          800: '#803615', 900: '#6a2e14',
        },
        dark: {
          900: '#0f0e0d', 800: '#1a1815', 700: '#252219', 600: '#302d22', 500: '#3d3928',
        },
      },
    },
  },
  plugins: [],
}
