const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const config = require('./index');
const routerManifest = require('../dll/routerVendor.manifest');
const reduxManifest = require('../dll/reduxVendor.manifest');
const momentManifest = require('../dll/momentVendor.manifest');

// FIXME
const { GitRevisionPlugin } = require('git-revision-webpack-plugin')
const gitRevisionPlugin = new GitRevisionPlugin()

const prodConfig = () =>  webpackMerge(baseConfig, {
    entry: {
        main: path.join(config.srcDir, './index.js')
    },
    output: {
        path: config.distDir,
        filename:'static/[name].[contenthash].js',
        // publicPath:  config.buildPublicPath
        publicPath: config.buildPublicPath
    },
    module: {
        rules: [
            {
                test: /\.(css|less)/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]--[hash:base64:5]'
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
                test: /\.(css|less)/,
                exclude: /src/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true
                        }
                    }
                ]
            }
        ]
    },
    mode: 'production',
    // devtool: "source-map",
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true,
                uglifyOptions: {
                    compress: {
                        drop_console: false
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all"
                },
                default: {
                    minChunks: 1,
                    priority: -20,
                    reuseExistingChunk: true
                }
            }
        },
        // runtimeChunk: {
        //     name: 'manifest'
        // }
    },
    plugins: [
        new webpack.DefinePlugin({
          'appInfo': {
            'VERSION': JSON.stringify(gitRevisionPlugin.version()),
            'COMMITHASH': JSON.stringify(gitRevisionPlugin.commithash()),
            'BRANCH': JSON.stringify(gitRevisionPlugin.branch()),
          },
        }),
        new CleanWebpackPlugin(config.distDir, { root: path.join(__dirname, '../') }),
        new webpack.ContextReplacementPlugin(
            /moment[\\\/]locale$/,
            /^\.\/(zh-cn)$/
        ),
        new MiniCssExtractPlugin({
            filename: "static/[name].[chunkhash].css",
            chunkFilename: "static/[name].[chunkhash].css"
        }),
        new webpack.DllReferencePlugin({
            manifest: routerManifest
        }),
        new webpack.DllReferencePlugin({
            manifest:reduxManifest
        }),
        new webpack.DllReferencePlugin({
            manifest: momentManifest
        }),
        new HtmlWebpackPlugin({
            title: 'manage system',
            template: path.join(config.srcDir, './index.html')
        }),
        new AddAssetHtmlPlugin(
            {
                filepath: path.join(config.dllDir, './dll.*.js'),
                includeSourcemap: false,
                hash: true,
                publicPath: '/static',
                outputPath: 'static'
            },
        ),
        // new BundleAnalyzerPlugin()
    ],
    stats: {
        colors: true,
        children: false,
        modules: false,
        chunks: false,
        chunkModules: false
    }
});

module.exports = prodConfig;
