
const path = require('path');
const webpack = require('webpack');
const config = require('./index');
module.exports = {
    mode: "production",
    entry: {
        momentVendor: ['moment'],
        routerVendor: ['react-router-dom', 'prop-types'],
        reduxVendor: ['redux', 'react-redux', 'redux-saga']
    },
    output: {
        path: config.dllDir,
        filename: "dll.[name].js",
        library: '[name]',
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /moment[\\\/]locale$/,
            /^\.\/(zh-cn)$/
        ),
        new webpack.DllPlugin({
            path: path.join(config.dllDir, './[name].manifest.json'),
            name: '[name]'
        })
    ]

};