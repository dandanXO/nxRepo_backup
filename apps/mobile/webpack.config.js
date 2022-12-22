console.info("[api-mobile][build]");

const webpack = require('webpack');
const { merge } = require('webpack-merge');
// const webpackConfig = require('@nrwl/react/plugins/webpack');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const isProduction = process.env.NODE_ENV == "production";
const isProduction = process.env.NODE_ENV !== undefined;
console.log("process.env.NODE_ENV:", process.env.NODE_ENV);
const HtmlWebpackPlugin = require("html-webpack-plugin");

// get git info from command line
// let commitHash = require('child_process')
//   .execSync('git rev-parse --short HEAD')
//   .toString()
//   .trim();

const { GitRevisionPlugin } = require('git-revision-webpack-plugin')
const gitRevisionPlugin = new GitRevisionPlugin()
// console.log("gitRevisionPlugin.commithash()", gitRevisionPlugin.commithash());
const SentryCliPlugin = require('@sentry/webpack-plugin');


module.exports = (config, context) => {
  const finalConfig = merge(config, {
    // devtool: false,
    // devtool: !isProduction ? "cheap-module-eval-source-map" : "source-map",
    devtool: "source-map",
    output: {
      filename: "[name].[contenthash].js",
      // sourceMapFilename: 'maps/[name].[contenthash].map.js',
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
      }),
      // new CleanWebpackPlugin({
      //   verbose: true,
      // }),
      // new SentryCliPlugin({
      //   release: `${gitRevisionPlugin.commithash()}`,
      //   debug: true,
      //   authToken: '82a0bb80a6d641f3adb38163f31bc6d87e2fbd4ef0d64dde9ddfc135e3c0c6c0',
      //   org: "workshop-xs",
      //   project: "api-mobile",
      //   include: './dist/apps/mobile',
      //   ignoreFile: '.sentrycliignore',
      //   ignore: [
      //     'node_modules',
      //     'webpack.config.js'
      //   ],
      //   configFile: 'sentry.properties',
      // }),
    ]
  });
  if(isProduction) {
  //   finalConfig.plugins.push(
  //     new CleanWebpackPlugin({
  //       verbose: true,
  //     })
  //   );
    finalConfig.plugins.push(
      new SentryCliPlugin({
        debug: true,
        authToken: '82a0bb80a6d641f3adb38163f31bc6d87e2fbd4ef0d64dde9ddfc135e3c0c6c0',
        org: "workshop-xs",
        project: "api-mobile",
        include: './dist/apps/mobile',
        ignoreFile: '.sentrycliignore',
        ignore: [
          'node_modules',
          'webpack.config.js'
        ],
        configFile: 'sentry.properties',
        // setCommits: {
        //   auto: false,
          // ignoreMissing: true,
          // repo: "frontend",
          // commit: gitRevisionPlugin.commithash(),
        // }
      }),
    )
  }
  // console.log("finalConfig", finalConfig);
  // console.log("process.env.NODE_ENV", process.env.NODE_ENV);
  return finalConfig;
};
