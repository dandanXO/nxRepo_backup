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

        // target: 'http://test.llyq.mayiaf.com',
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