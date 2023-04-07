const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');

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
          }

      },
  },
  plugins: [
    // require("daisyui")
  ],
};
