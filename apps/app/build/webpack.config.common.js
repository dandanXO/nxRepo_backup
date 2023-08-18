const { GitRevisionPlugin } = require('git-revision-webpack-plugin');

const APP_IDENTIFICATION = `[apps/app][${process.env.NODE_COUNTRY}] `;
const isProduction = process.env.NODE_ENV == 'production';
const isDashboard = process.env.NODE_DASHBOARD;

console.log('isProduction: ', isProduction);
console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
console.log('process.env.NODE_COUNTRY:', process.env.NODE_COUNTRY);
console.log('process.env.NODE_ANALYZER:', process.env.NODE_ANALYZER);
console.log('process.env.NODE_UI_VERSION:', process.env.NODE_UI_VERSION);

const gitRevisionPlugin = new GitRevisionPlugin();
console.log('gitRevisionPlugin.commithash()', gitRevisionPlugin.commithash());
// NOTICE:
const PUBLIC_PATH = !isProduction ? '/' : '/v2/';
console.log('PUBLIC_PATH', PUBLIC_PATH);

// NOTICE:
const ASSET_OUTPUT_PATH = 'images';

module.exports = {
  APP_IDENTIFICATION,
  isProduction,
  isDashboard,
  gitRevisionPlugin,
  ASSET_OUTPUT_PATH,
  PUBLIC_PATH,
}
