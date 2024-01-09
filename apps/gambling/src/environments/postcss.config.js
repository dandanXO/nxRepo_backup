const { join } = require('path');
const {environment} = require("./environment");

// Note: If you use library-specific PostCSS/Tailwind configuration then you should remove the `postcssConfig` build
// option from your application's configuration (i.e. project.json).
//
// See: https://nx.dev/guides/using-tailwind-css-in-react#step-4:-applying-configuration-to-libraries


const config = join(__dirname, '../src/environments/' + environment.uVersion + 'tailwind.config.js');
console.log("config", config);

module.exports = {
  plugins: {
    tailwindcss: {
      config,
    },
    autoprefixer: {},
  },
};
