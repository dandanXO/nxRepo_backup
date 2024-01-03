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
    // NOTE: Naming your colors
    // https://tailwindcss.com/docs/customizing-colors#naming-your-colors
    colors: {
      ...colors,
      /*bg*/
      "main": 'var(--main)',
      "varient": 'var(--varient)',
      "assistant": 'var(--assistant)',
      "medium": 'var(--medium)',
      "light": 'var(--light)',

      /*bg-other*/
      "game-block": 'var(--game-block)',
      "footer": 'var(--footer)',

      /*main*/
      "main-primary-main": 'var(--main-primary-main)',
      "main-primary-varient": 'var(--main-primary-varient)',
      "main-primary-assistant": 'var(--main-primary-assistant)',
      "main-secondary-main": 'var(--main-secondary-main)',
      "main-state-error": 'var(--main-state-error)',
      "main-state-warning": 'var(--main-state-warning)',

      /*table*/
      "table-main": 'var(--table-main)',
      "table-varient": 'var(--table-varient)',
      "table-asisstant": 'var(--table-asisstant)',
      "table-light": 'var(--table-light)',

      /*button*/
      /*btn/button*/
      "btn-gradient1-from": 'var(--btn-gradient1-from)',
      "btn-gradient1-to": 'var(--btn-gradient1-to)',

      /*btn/button_2*/
      "btn-gradient-2-from": 'var(--btn-gradient-2-from)',
      "btn-gradient-2-to": 'var(--btn-gradient-2-to)',

      /*btn/button_inactive*/
      "btn-gradient-inactive-from": 'var(--btn-gradient-inactive-from)',
      "btn-gradient-inactive-to": 'var(--btn-gradient-inactive-to)',

      /*btn/icon*/
      "btn-gradient-icon-from": 'var(--btn-gradient-icon-from)',
      "btn-gradient-icon-to": 'var(--btn-gradient-icon-to)',

      /*btn-vip*/
      "btn-gradient-vip-from": 'var(--btn-gradient-vip-from)',
      "btn-gradient-vip-to": 'var(--btn-gradient-vip-to)',

      /*dashboard*/
      /*dashboard/block_1*/
      "dashboard-block1-gradient-from": 'var(--dashboard-block1-gradient-from)',
      "dashboard-block1-gradient-to": 'var(--dashboard-block1-gradient-to)',
      /*dashboard/block_2*/
      "dashboard-block2-gradient-from": 'var(--dashboard-block2-gradient-from)',
      "dashboard-block2-gradient-to": 'var(--dashboard-block2-gradient-to)',
      /*dashboard/block_3*/
      "dashboard-block3-gradient-from": 'var(--dashboard-block3-gradient-from)',
      "dashboard-block3-gradient-to": 'var(--dashboard-block3-gradient-to)',


      /*dashboard/dashboard_base*/
      "dashboard-base": 'var(--dashboard-base)',
      /*dashboard/block_1*/
      "dashboard-block1": 'var(--dashboard-block1)',

      /*dashboard/block_2*/
      "dashboard-block2": 'var(--dashboard-block2)',
      /*dashboard/block_3*/
      "dashboard-block3": 'var(--dashboard-block3)',


      /*text*/
      /*text/telegram*/
      "telegram": 'var(--text-telegram)',
      /*text/black*/
      "black": 'var(--black)',
      /*text/white*/
      "white": 'var(--white)',
      /*text/grey*/
      "gray": 'var(--gray)',

      /*text-dashboard*/
      "block1": 'var(--block1)',
      /*text-ad*/
      "gradient-ad-from": 'var(--gradient-ad-from)',
      "gradient-ad-to": 'var(--gradient-ad-to)',

      /*text-ad_tg*/
      "gradient-ad-tg-from": 'var(--gradient-ad-tg-from)',
      "gradient-ad-tg-to": 'var(--gradient-ad-tg-to)',
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
