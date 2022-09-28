const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const {commonRules, commonPlugins} = require('./webpack_common.config');

const { name } = require('../package.json');

module.exports = {
    mode: 'production',
    entry: './src/main.tsx',
    output: {
        // publicPath: './',
        // path: path.resolve(__dirname, '../', "dist/child/entry-cms-react/"),
        // path: path.resolve(__dirname, '../', "dist/child/entry-cms-react/"),
        path: path.resolve(__dirname, '../../dlh-web', "dist/child/entry-cms-react/"),
        filename: "bundle.[hash:8].js",

        // NOTE: [webpack5子应用加载失败 #1092](https://github.com/umijs/qiankun/issues/1092)
        // NOTICE: MicroApp
        publicPath: "/child/entry-cms-react/",
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
            '@/pages': path.resolve(__dirname, "src/pages"),
            '@/assets': path.resolve(__dirname, "src/assets"),
            '@/public': path.resolve(__dirname, "src/public"),
            '@/http': path.resolve(__dirname, "src/http_request"),
            '@/router': path.resolve(__dirname, "src/router"),
            '@/store': path.resolve(__dirname, "src/store"),
        }
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minSize: 0,
                    minChunks: 2,
                },
                vendors: {
                    test: /node_modules/,
                    name: 'vendors',
                    minSize: 0,
                    minChunks: 1,
                    chunks: 'initial',
                    priority: 1
                }
            }
        },
        minimizer: [
            new UglifyJSPlugin(),
            new TerserPlugin({
                terserOptions: {
                    ecma: undefined,
                    warnings: false,
                    parse: {},
                    compress: {
                        drop_console: true,
                        drop_debugger: false,
                        pure_funcs: ['console.log']
                    }
                },
            }),
            new OptimizeCssAssetsPlugin()
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        ...commonPlugins
    ],
    module: {
        rules: [
            ...commonRules
        ]
    }
}
