const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

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
      tertiary: {
        main: 'var(--tertiary_main)',
        variant: 'var(--tertiary_variant)',
      },
      cbg: {
        // NOTE: background
        primary: 'var(--custom_bg_primary)',
        secondary: 'var(--custom_bg_secondary)',
        tertiary: 'var(--custom_bg_tertiary)',
      },
      ctext: {
        // NOTE: text
        primary: 'var(--custom_text_primary)',
        secondary: 'var(--custom_text_secondary)',
        tertiary: 'var(--custom_text_tertiary)',
        divider: 'var(--custom_text_divider)',
      },
      cstate: {
        // NOTE: State
        disable: {
          main: 'var(--custom_state_disable_main)',
          variant: 'var(--custom_state_disable_variant)',
          assistant: 'var(--custom_state_disable_assistant)',
        },
        success: {
          main: 'var(--custom_state_success_main)',
        },
        warning: {
          main: 'var(--custom_state_warning_main)',
          variant: 'var(--custom_state_warning_variant)',
        },
        error: {
          main: 'var(--custom_state_error_main)',
          variant: 'var(--custom_state_error_variant)',
        },
        info: {
          main: 'var(--custom_state_info_main)',
          variant: 'var(--custom_state_info_variant)',
        },
      },
      cTextFields: {
        background: {
          main: 'var(--custom_text_fields_background_main)',
          variant: 'var(--custom_text_fields_background_variant)',
        },
        placeholder: {
          main: 'var(--custom_text_fields_placeholder_main)',
        },
        outline: {
          main: 'var(--custom_text_fields_outline_main)',
        },
      },
    },
  },
  plugins: [
    // require("daisyui")
    plugin(function ({ addUtilities, addComponents, addVariant, e }) {
      // addVariant('abc',['bg-gradient-to-b from-[#18A851] to-[#138641]'])
      // addVariant('data-active', ({ modifySelectors, separator }) => {
      //     modifySelectors(({ className }) => {
      //       return `.${e(`data-active${separator}${className}`)}[data-active="true"]

      //       `;
      //     })
      //   });
      //   addVariant('bbb-gradient', ['&:bg-gradient-to-b', '&:from-[#18A851]', '&:to-[#138641]'])
      addComponents({
        '.open-index-button': {
          backgroundColor: 'var(--custom_bg_homepage_button)',
        },
      });
      // addUtilities({
      //     '.open-index-button': {
      //         backgroundColor:  'var(--custom_bg_homepage_button)',
      //     },
      // })
    }),
  ],
  safelist: ['border-l-2', 'border-dashed'],
};
