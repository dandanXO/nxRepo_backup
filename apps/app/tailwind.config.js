const { createGlobPatternsForDependencies } = require('@nrwl/react/tailwind');
const { join } = require('path');
const colors = require('tailwindcss/colors');
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
      // NOTE: other
      disabled: {
        main: 'var(--disabled_main)',
        variant: 'var(--disabled_variant)',
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
        placeholder: 'var(--custom_text_placeholder)',
      },
      cstate: {
        // NOTE: State
        disable: {
          main: 'var(--custom_state_disable_main)',
          variant: 'var(--custom_state_disable_variant)',
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
    },
  },
  plugins: [
    // require("daisyui")
  ],
  safelist: ['border-l-2', 'border-dashed'],
};
