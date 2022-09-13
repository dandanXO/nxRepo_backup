const webpack = require('webpack');
const { merge } = require('webpack-merge');
// const webpackConfig = require('@nrwl/react/plugins/webpack');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const isProduction = process.env.NODE_ENV == "production";

module.exports = (config, context) => {
  const finalConfig = merge(config, {
    output: {
      filename: "[name].[contenthash].js",
      sourceMapFilename: 'maps/[name].[chunkhash].map.js',
    },
    module: {
      rules: [
        {
          test: /\.svg$/,
          oneOf: [
            // If coming from JS/TS or MDX file, then transform into React component using SVGR.
            {
              issuer: /\.(js|ts|md)x?$/,
              use: [
                {
                  loader: require.resolve('@svgr/webpack'),
                  options: {
                    svgo: false,
                    titleProp: true,
                    ref: true,
                  },
                },
                {
                  loader: require.resolve('url-loader'),
                  options: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]',
                    esModule: false,
                  },
                },
              ],
            },
            // Fallback to plain URL loader.
            {
              use: [
                {
                  loader: require.resolve('url-loader'),
                  options: {
                    limit: 10000,
                    name: '[name].[hash:7].[ext]',
                  },
                },
              ],
            },
          ],
        }
      ],
    },
  });
  if(isProduction) {
    finalConfig.plugins.push(
      new CleanWebpackPlugin({
        verbose: true,
      })
    );
  }
  console.log("finalConfig", finalConfig);
  return finalConfig;
};
