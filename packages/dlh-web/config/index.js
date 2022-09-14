const path = require('path');

const rootDir = path.resolve(__dirname, '../');
//代码目录
const srcDir = path.join(rootDir, './src');
//打包目录
const distDir = path.join(rootDir, './dist');

//dll目录
const dllDir = path.join(rootDir, './dll');

const buildPublicPath = '/';

//代理配置
const proxy = {
  '/hs':{
    // NOTE: unknow
    // target: 'http://test.llyq.mayiaf.com',
    // NOTE: India 產品後台
    // target: "http://65.1.53.136:8080",
    // NOTE: API 產品後台
    target: "https://app.india-api-dev.com",
    changeOrigin: true
  }
};

module.exports = {
    srcDir,
    distDir,
    dllDir,
    proxy,
    buildPublicPath
};
