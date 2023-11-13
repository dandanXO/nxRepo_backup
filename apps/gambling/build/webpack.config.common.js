const { GitRevisionPlugin } = require('git-revision-webpack-plugin');

const APP_IDENTIFICATION = `[apps/gambling][${process.env.NODE_PLATFORM}] `;
const isProduction = process.env.NODE_ENV == 'production';
const isDashboard = process.env.NODE_DASHBOARD;
const devServerHostIP = process.env.NODE_DEV_SERVER_HOST_IP;
console.log("process.env.NODE_DEV_SERVER_HOST_IP", devServerHostIP)
console.log('process.env.NX_CLI_SET:', process.env.NX_CLI_SET);

console.log('isProduction: ', isProduction);
// console.log('process.env:', process.env);

console.log('process.env.NX_CLI_SET:', process.env.NX_CLI_SET);
console.log('process.env.NX_LOAD_DOT_ENV_FILES:', process.env.NX_LOAD_DOT_ENV_FILES);
console.log('process.env.NX_WORKSPACE_ROOT:', process.env.NX_WORKSPACE_ROOT);
console.log('process.env.NX_TERMINAL_OUTPUT_PATH:', process.env.NX_TERMINAL_OUTPUT_PATH);
console.log('process.env.NX_STREAM_OUTPUT:', process.env.NX_STREAM_OUTPUT);
console.log('process.env.NX_TASK_TARGET_PROJECT:', process.env.NX_TASK_TARGET_PROJECT);
console.log('process.env.NX_TASK_TARGET_TARGET:', process.env.NX_TASK_TARGET_TARGET);
console.log('process.env.NX_TASK_TARGET_CONFIGURATION:', process.env.NX_TASK_TARGET_CONFIGURATION);
console.log('process.env.NX_TASK_HASH:', process.env.NX_TASK_HASH);
console.log('process.env.LERNA_PACKAGE_NAME:', process.env.LERNA_PACKAGE_NAME);

console.log('process.env.NODE_ENV:', process.env.NODE_ENV);
console.log('process.env.NODE_COUNTRY:', process.env.NODE_COUNTRY);
console.log('process.env.NODE_ANALYZER:', process.env.NODE_ANALYZER);
console.log('process.env.NODE_UI_VERSION:', process.env.NODE_UI_VERSION);

const gitRevisionPlugin = new GitRevisionPlugin();
console.log('gitRevisionPlugin.commithash()', gitRevisionPlugin.commithash());
// NOTICE:
const PUBLIC_PATH = '/';
console.log('PUBLIC_PATH', PUBLIC_PATH);

// NOTICE:
const ASSET_OUTPUT_PATH = 'images';

// NOTE: window didn't support it
let { hostIP } = require('./getNetworkInterface');
if(!hostIP) {
  hostIP = devServerHostIP;
}

module.exports = {
  APP_IDENTIFICATION,
  isProduction,
  isDashboard,
  gitRevisionPlugin,
  ASSET_OUTPUT_PATH,
  PUBLIC_PATH,
  hostIP,
};
