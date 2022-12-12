const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {commonPlugins, commonRules} = require("./webpack_common.config");
const {name} = require("../package.json");
module.exports = {
    entry: './src/main.tsx',
    output: {
        // path: path.resolve(__dirname, '../', "dist"),
        path: path.resolve(__dirname, '../../dlh-web', "dist/child/entry-cms-react/"),

        filename: "bundle.[hash:8].js",

        // NOTICE: MicroApp
        // publicPath: "/child/entry-cms-react/",
        publicPath: "/",
        // chunkLoadingGlobal: `webpackJsonp_${name}`,
        jsonpFunction: `webpackJsonp_${name}`,
        globalObject: 'window',
        library: `${name}-[name]`,
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    resolve: {
        extensions: [".ts", ".tsx", '.js', '.jsx', '.css', '.less', '.scss', '.json'],
        alias: {
            '@/components': path.resolve(__dirname, "src/components"),
            '@/views': path.resolve(__dirname, "src/views"),
            '@/assets': path.resolve(__dirname, "src/assets"),
            '@/style': path.resolve(__dirname, "src/style"),
            '@/service': path.resolve(__dirname, "src/service"),
            '@/router': path.resolve(__dirname, "src/router"),
            '@/store': path.resolve(__dirname, "src/store"),
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        ...commonPlugins

    ],
    devServer: {
        // [Webpack5中devServer配置contentBase报错的问题](https://blog.csdn.net/qq_43048301/article/details/121554459)
        // contentBase: path.join(__dirname, './dist'),
        // contentBase: path.resolve(__dirname, '../', "dist/child/entry-cms-react/"),
        contentBase: path.resolve(__dirname, '../../dlh-web', "dist/child/entry-cms-react/"),

        // static: {
        //     directory: path.join(__dirname, './dist'),
        // },
        headers: {
            'Access-Control-Allow-Origin': '*', // 允许跨域
        },
        // NOTICE: [【解决方案】webpack `Invalid Host/Origin header`问题](https://blog.csdn.net/u013243347/article/details/85223016)
        disableHostCheck: true,
        open: true,
        port: 9005,
        proxy: {
            //设置代理
            "/hs": {
                target: "https://app.india-api-dev.com",
                // target: "https://app.pk-api-dev.com",
                secure: false, // 協議是https的時候必須要寫
                changeOrigin: true,
            },
        },
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            ...commonRules
        ]
    }
}
