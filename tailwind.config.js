/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
      colors: {
        'primary': {
          '50': '#e9ecf4',
          '100': '#bac3dd',
          '200': '#99a7cd',
          '300': '#6b7eb6',
          '400': '#4e65a8',
          '500': '#223f92',
          '600': '#1f3985',
          '700': '#182d68',
          '800': '#132350',
          '900': '#0e1a3d',
        },
      },
    },
  },
  plugins: [
     require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}