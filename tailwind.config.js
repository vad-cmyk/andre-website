/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"],
  safelist: ["is-visible", "is-open", "is-active"],
  theme: {
    extend: {
      colors: {
        ink: '#0E1D30', wetcoat: '#16283F', gold: '#C9A257',
        'gold-deep': '#A9803E', canvas: '#FAF6ED', plaster: '#E4DECF', stone: '#6E6455',
      },
      fontFamily: {
        display: ['"Libre Caslon Display"', 'Georgia', 'serif'],
        body: ['"Public Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
