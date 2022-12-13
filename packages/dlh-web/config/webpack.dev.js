/*
* webpack development config
* */
const path = require('path');
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackBaseConfig = require('./webpack.base');
const config = require('./index');

const publicPath = "/";

// FIXME
const { GitRevisionPlugin } = require('git-revision-webpack-plugin')
const gitRevisionPlugin = new GitRevisionPlugin()


const devConfig = webpackMerge(webpackBaseConfig, {
    mode: 'development',
    entry: path.join(config.srcDir, './index.js'),
    output: {
        path: config.distDir,
        // NOTICE:
        filename: 'static/main.js',
        publicPath,
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                            },
                            importLoaders:1
                        }

                    },
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            },
            {
                test: /\.(css|less)$/,
                exclude: /src/,
                use: [
                    'style-loader',
                    "css-loader",
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            }
        ],
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: config.distDir ,
        port: 4100,
        historyApiFallback: true,
        hot: true,
        proxy: config.proxy,
        open: false,
        // FIX: Invalid Host header
        disableHostCheck: true,
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(config.srcDir, './index.html')
        }),
      new webpack.DefinePlugin({
        'appInfo': {
          'VERSION': JSON.stringify(gitRevisionPlugin.version()),
          'COMMITHASH': JSON.stringify(gitRevisionPlugin.commithash()),
          'BRANCH': JSON.stringify(gitRevisionPlugin.branch()),
        },
      })
    ]
});

module.exports = devConfig;


