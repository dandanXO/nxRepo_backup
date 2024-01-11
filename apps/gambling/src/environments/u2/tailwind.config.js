const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

const {tailwindVariables} = require("./tailwind.variables");
console.log("tailwindVariables", tailwindVariables);

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '../../../{src,pages,components}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      screens: tailwindVariables.theme.screens,
      bgGradientDeg: {
        75: '75deg',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: ' translateX(-200%)' },
        },
      },
      animation: {
        marquee: 'marquee 15s linear infinite',
      },
    },
  },
  plugins: [
    // require("daisyui"),
    plugin(function ({ matchUtilities, theme, addUtilities, addComponents, addVariant, e }) {
      matchUtilities(
        {
            'bg-gradient': (angle) => ({
                'background-image': `linear-gradient(${angle}, var(--tw-gradient-stops))`,
            }),
        },
        {
            // values from config and defaults you wish to use most
            values: Object.assign(
                theme('bgGradientDeg', {}), // name of config key. Must be unique
                {
                    10: '10deg', // bg-gradient-10
                    15: '15deg',
                    20: '20deg',
                    25: '25deg',
                    30: '30deg',
                    45: '45deg',
                    60: '60deg',
                    90: '90deg',
                    120: '120deg',
                    144: '144deg',
                    135: '135deg',
                }
            )
        }
     )
    }),
  ],
  safelist: ['border-l-2', 'border-dashed'],
};
