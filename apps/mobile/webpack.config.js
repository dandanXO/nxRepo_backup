const webpack = require('webpack');
const { merge } = require('webpack-merge');
// const webpackConfig = require('@nrwl/react/plugins/webpack');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const isProduction = process.env.NODE_ENV == "production";
const HtmlWebpackPlugin = require("html-webpack-plugin");

// get git info from command line
// let commitHash = require('child_process')
//   .execSync('git rev-parse --short HEAD')
//   .toString()
//   .trim();

const { GitRevisionPlugin } = require('git-revision-webpack-plugin')
const gitRevisionPlugin = new GitRevisionPlugin()
// console.log("gitRevisionPlugin.commithash()", gitRevisionPlugin.commithash());
module.exports = (config, context) => {
  const finalConfig = merge(config, {
    devtool: false,
    output: {
      filename: "[name].[contenthash].js",
      // sourceMapFilename: 'maps/[name].[chunkhash].map.js',
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
      // NOTE: REFACTOR ME
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
    plugins: [
      new webpack.DefinePlugin({
          'appInfo': {
              'VERSION': JSON.stringify(gitRevisionPlugin.version()),
              'COMMITHASH': JSON.stringify(gitRevisionPlugin.commithash()),
              'BRANCH': JSON.stringify(gitRevisionPlugin.branch()),
          },
      })
    ]
  });
  if(isProduction) {
    finalConfig.plugins.push(
      new CleanWebpackPlugin({
        verbose: true,
      })
    );
  }
  // console.log("finalConfig", finalConfig);
  // console.log("process.env.NODE_ENV", process.env.NODE_ENV);
  return finalConfig;
};
