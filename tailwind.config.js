module.exports = {
  purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        'bg-bg': "url('dalmatian-spots.svg')",
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
