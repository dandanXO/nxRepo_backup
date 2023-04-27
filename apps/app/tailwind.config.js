const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');
const colors = require('tailwindcss/colors')
// const customColors = require("./src/environments/theme/india/v55/tailwind.colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
      extend: {
          keyframes: {
              marquee: {
                  '0%': {  transform: 'translateX(100%)' },
                  '100%': { transform: ' translateX(-200%)' },
              }
          },
          animation: {
              marquee: 'marquee 15s linear infinite',
          },
      },
      // NOTE: Naming your colors
      // https://tailwindcss.com/docs/customizing-colors#naming-your-colors
      colors: {
        ...colors,
        // ...customColors,
        primary: {
          main: 'var(--primary_main)',
          variant: 'var(--primary_variant)',
          assistant: 'var(--primary_assistant)',
        },
        secondary: {
          main: 'var(--secondary_main)',
          variant: 'var(--secondary_variant)',
        },
        disabled: {
          main: 'var(--disabled_main)',
          variant: 'var(--disabled_variant)',
        },
      }
  },
  plugins: [
    // require("daisyui")
  ],
};
