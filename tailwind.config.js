const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./templates/**/*.html", "./theme/**/*.html"],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        lg: '1.5rem',
      },
      screens: {
        lg: '960px',
        xl: '1040px',
        '2xl': '1120px',
      },
    },
    fontFamily: {
      serif: ['"Crimson Pro"', ...defaultTheme.fontFamily.serif],
      sans: ['"Work Sans"', ...defaultTheme.fontFamily.sans],
      mono: ['"JetBrains Mono"', ...defaultTheme.fontFamily.mono],
    },
    extend: {
      maxWidth: {
        prose: '72ch',
      },
      boxShadow: {
        soft: '0 1px 2px 0 rgb(15 23 42 / 0.05), 0 1px 3px 0 rgb(15 23 42 / 0.1)',
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
  ],
};