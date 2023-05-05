// NOTICE: refactor me
const APP_IDENTIFICATION = '[apps/app]';
const infoLog = (message, rest) => {
  if (!rest) {
    console.info(`${APP_IDENTIFICATION} ${message}`);
  } else {
    console.info(`${APP_IDENTIFICATION} ${message}`, rest);
  }
};

infoLog('build');

const webpack = require('webpack');
const { merge } = require('webpack-merge');
const isProduction = process.env.NODE_ENV == 'production';
console.log("process.env.NODE_ENV:", process.env.NODE_ENV);
console.log("process.env.NODE_COUNTRY:", process.env.NODE_COUNTRY);
console.log("process.env.NODE_ANALYZER:", process.env.NODE_ANALYZER);
console.log("process.env.NODE_UI_VERSION:", process.env.NODE_UI_VERSION);
console.log("isProduction: ", isProduction);

const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin();
console.log('gitRevisionPlugin.commithash()', gitRevisionPlugin.commithash());

const SentryCliPlugin = require('@sentry/webpack-plugin');

const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');


const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");

const PUBLIC_PATH = !isProduction ? "/" : "/v2/";
console.log("PUBLIC_PATH", PUBLIC_PATH);

const ASSET_OUTPUT_PATH = "asset";

let proxyURL= "https://app.india-api-dev.com";
if(process.env.NODE_COUNTRY === "in") {
  proxyURL = "https://app.india-api-dev.com";
} else if(process.env.NODE_COUNTRY === "pk") {
  proxyURL = "https://app.pk-api-dev.com";
} else if(process.env.NODE_COUNTRY === "bd") {
  proxyURL = "https://app.bd-api-dev.com";
}

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = (config, context) => {
  const finalConfig = merge(config, {
    // devtool: false,
    // devtool: !isProduction ? "cheap-module-eval-source-map" : "source-map",
    // devtool: "source-map",
    output: {
      // filename: '[name].[contenthash].js',
      // sourceMapFilename: 'maps/[name].[contenthash].map.js'
      publicPath: PUBLIC_PATH,
      // assetModuleFilename: `${ASSET_OUTPUT_PATH}/[hash][ext][query]`
    },
    module: {
      rules: [
        // {
        //   test: /\.svg$/,
        //   generator: {
        //     publicPath: PUBLIC_PATH,
        //     // outputPath: 'cdn-assets/',
        //   },
        //   oneOf: [
        //     // If coming from JS/TS or MDX file, then transform into React component using SVGR.
        //     {
        //       issuer: /\.(js|ts|md)x?$/,
        //       use: [
        //         {
        //           loader: require.resolve('@svgr/webpack'),
        //           options: {
        //             svgo: false,
        //             titleProp: true,
        //             ref: true,
        //           },
        //         },
        //         {
        //           loader: require.resolve('url-loader'),
        //           options: {
        //             limit: 10000,
        //             name: '[name].[hash:7].[ext]',
        //             esModule: false,
        //           },
        //         },
        //       ],
        //     },
        //     // Fallback to plain URL loader.
        //     {
        //       use: [
        //         {
        //           loader: require.resolve('url-loader'),
        //           options: {
        //             limit: 10000,
        //             name: '[name].[hash:7].[ext]',
        //           },
        //         },
        //       ],
        //     },
        //   ],
        // },
      ],
    },
    devServer: {
      hot: true,
      open: true,
      host: 'localhost',
      // NOTE: REFACTOR ME
      port: 4002,
      historyApiFallback: true,
      onBeforeSetupMiddleware: function (devServer) {
        if (!devServer) {
          throw new Error('webpack-dev-server is not defined');
        }
        // NOTICE: demo
        // devServer.app.get("/open-api/zh-tw/Attractions/All", (req, res) => {
        //   res.json(mockAPIResponse);
        // });
      },
      proxy: {
        //设置代理
        "/api": {
          target: proxyURL,
          secure: false, // 協議是https的時候必須要寫
          changeOrigin: true,
        },
      },
    },
    plugins: [
      // new PreloadWebpackPlugin({
      //   rel: 'preload',
      //   // include: 'asyncChunks'
      //   include: 'all'
      //   // include: 'initial'
      // }),
      // NOTICE:
      new webpack.DefinePlugin({
        AppInfo: {
          VERSION: JSON.stringify(gitRevisionPlugin.version()),
          COMMITHASH: JSON.stringify(gitRevisionPlugin.commithash()),
          BRANCH: JSON.stringify(gitRevisionPlugin.branch()),
          UI_VERSION: process.env.NODE_UI_VERSION,
        },
      }),
      // new CleanWebpackPlugin({
      //   verbose: true,
      // }),
    ],
  });

  if(process.env.NODE_ANALYZER && !isProduction) {
    finalConfig.plugins.push(
      new BundleAnalyzerPlugin()
    )
    // finalConfig["optimization"] = {
    //   minimize: true,
    //   minimizer: [
    //     new TerserPlugin({
    //       terserOptions: {
    //         compress: {
    //           drop_console: true,
    //         },
    //         format: {
    //           comments: false,
    //         },
    //       },
    //       // NOTICE: the extractComments option is not supported and all comments will be removed by default, it will be fixed in future
    //       extractComments: false,
    //
    //     })
    //   ],
    // }
  } else if(isProduction){
    // 只要加就會掛掉
    finalConfig.plugins.push(
      new HtmlWebpackPlugin({
        // 配置 HTML 模板路徑與生成名稱 (第三步)
        template: './src/index.html',
        filename: 'index.html',
        // publicPath: "/v2",
      }),
    )
    // finalConfig["optimization"] = {
    //   minimize: true,
    //   minimizer: [
    //     new TerserPlugin({
    //       terserOptions: {
    //         compress: {
    //           drop_console: true,
    //         },
    //         format: {
    //           comments: false,
    //         },
    //       },
    //       // NOTICE: the extractComments option is not supported and all comments will be removed by default, it will be fixed in future
    //       extractComments: false,
    //
    //     })
    //   ],
    // }

    //   finalConfig.plugins.push(
    //     new CleanWebpackPlugin({
    //       verbose: true,
    //     })
    //   );

    finalConfig.plugins.push(
      new SentryCliPlugin({
        url: "https://monitor.sijneokd.com",
        authToken: '4a49d8eb6e164c86a8284b81294ed8d1',
        debug: true,
        include: './dist/apps/app',
        ignoreFile: '.sentrycliignore',
        ignore: ['node_modules', 'webpack.config.js'],
        org: 'sentry',
        project: 'api-app',
        // configFile: 'sentry.properties',
        // setCommits: {
          //   auto: false,
          // ignoreMissing: true,
          // repo: "frontend",
          // commit: gitRevisionPlugin.commithash(),
        // }
      })
    );

  }
  console.log('finalConfig', finalConfig);
  // console.log("process.env.NODE_ENV", process.env.NODE_ENV);
  return finalConfig;
};
