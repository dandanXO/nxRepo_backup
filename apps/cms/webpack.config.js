const webpack = require('webpack');
const { merge } = require('webpack-merge');
// const webpackConfig = require('@nrwl/react/plugins/webpack');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const isProduction = process.env.NODE_ENV == "production";
const HtmlWebpackPlugin = require("html-webpack-plugin");

const packageName = "new-cms";
module.exports = (config, context) => {
  const finalConfig = merge(config, {
    output: {
      // filename: "[name].[contenthash].js",
      // sourceMapFilename: 'maps/[name].[chunkhash].map.js',
      library: `${packageName}-[name]`,
      libraryTarget: 'umd',
      // [Document webpack change: Chunk loading method per entrypoint](https://github.com/webpack/webpack.js.org/issues/3940)
      // jsonpFunction: `webpackJsonp_${packageName}`,
      chunkLoadingGlobal: `webpackJsonp_${packageName}`,
      globalObject: 'window',
      publicPath: '/child/react-history/',
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
    devServer: {
      hot: true,
      open: true,
      host: "localhost",
      port: 4003,
      historyApiFallback: true,
      onBeforeSetupMiddleware: function (devServer) {
        if (!devServer) {
          throw new Error("webpack-dev-server is not defined");
        }
        // NOTICE: demo
        // devServer.app.get("/open-api/zh-tw/Attractions/All", (req, res) => {
        //   res.json(mockAPIResponse);
        // });
      },
      // NOTICE: replace by @nrwl/web:webpack
      // proxy: {
      //   //设置代理
      //   "/api": {
      //     target: "https://app.india-api-dev.com",
      //     secure: false, // 協議是https的時候必須要寫
      //     changeOrigin: true,
      //   },
      // },
    },
  });
  if(isProduction) {
    finalConfig.plugins.push(
      new CleanWebpackPlugin({
        verbose: true,
      })
    );
  }
  // console.log("finalConfig", finalConfig);
  return finalConfig;
};
