/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          dark:       '#2C1810',
          brown:      '#4A2C1A',
          terracotta: '#C4602A',
          gold:       '#D4A853',
          cream:      '#F5EDD6',
          light:      '#FBF6EE',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
