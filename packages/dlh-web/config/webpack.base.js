/*
* webpack base config
* */
const path = require('path');
const config = require('./index');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv


module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
        alias: {
            components$: path.join(config.srcDir,'./components/index.js'),
            utils$: path.join(config.srcDir, './utils/index.js'),
            hooks$: path.join(config.srcDir, './hooks/index.js'),
            conf$:path.join(config.srcDir, `./conf/${argv.env}.json`)
        },
        symlinks: false
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                // include: config.srcDir,
                exclude: /node_modules/,
                use: [
                    'thread-loader',
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]'
                }
            }
        ]
    }
};
