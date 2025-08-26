/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        body: 'var(--font-sans)',
      }
    },
  },
  corePlugins: {
    preflight: false, // mantenemos reset existente
  }
};
