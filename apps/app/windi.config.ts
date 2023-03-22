import { defineConfig } from 'windicss/helpers'
import colors from 'windicss/colors'
// import plugin from 'windicss/plugin'

export default defineConfig({
  // attributify: true,
  extract: {
    // A common use case is scanning files from the root directory
    // include: ['**/*.{html,jsx,tsx,css}'],

    // if you are excluding files, make sure you always include node_modules and .git
    // exclude: ['node_modules', '.git', 'dist', '.next'],
  },
})

//
//
// import { defineConfig } from 'windicss/helpers';
//
// export function createConfig(includeOptions = []) {
//   const include = ['**/*.{jsx,tsx,css}'];
//
//   includeOptions.forEach((option) => {
//     switch (option) {
//       case 'INCLUDE: shared/ui TO: nx-ecommerce':
//         include.push('../../libs/shared/ui/**/*.{jsx,tsx,css}');
//         break;
//     }
//   });
//
//   return defineConfig({
//     theme: {
//       extend: {
//         screens: {
//           '350px': '350px',
//           xs: '545px',
//         },
//       },
//     },
//     extract: {
//       include,
//       exclude: ['node_modules', '.git', '.next'],
//     },
//     // plugins: [require('windicss/plugin/aspect-ratio')],
//   });
// }
//
// export default createConfig();
