const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const { merge } = require('webpack-merge');

const SentryCliPlugin = require('@sentry/webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');

const {
  APP_IDENTIFICATION,
  gitRevisionPlugin,
  isProduction,
  isDashboard,
  PUBLIC_PATH,
  ASSET_OUTPUT_PATH,
  hostIP,
} = require('./webpack.config.common');

const MomentTimezoneDataPlugin = require('moment-timezone-data-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const WebpackSentryConfig = require('./WebpackSentryConfig.json');
const AppBabelLoader = path.join(__dirname, './loader/app-babel-loader.js');
const { proxyURL, PORT } = require('./env/webpack.config.proxy');

const infoLog = (message, rest) => {
  if (!rest) {
    console.info(`${APP_IDENTIFICATION} ${message}`);
  } else {
    console.info(`${APP_IDENTIFICATION} ${message}`, rest);
  }
};

// NOTICE: react-apexcharts 裡面有舊版本的 .bablerc，跟目前專案的不符合，include node_modules 會導致專案與node_modules 下 .babelrc 不一致
const filePath = path.resolve(
  __dirname,
  '../../../node_modules/react-apexcharts/.babelrc'
);
fs.exists(filePath, function (exists) {
  if (exists) {
    console.log('[react-apexcharts/.babelrc] File exists. Deleting now ...');
    fs.unlinkSync(filePath);
  } else {
    console.log('[react-apexcharts/.babelrc] File not found, so not deleting.');
  }
});

// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const smp = new SpeedMeasurePlugin();

infoLog('build');


module.exports = (config, context) => {
  let finalConfig = merge(config, {
    // cache: {
    //   type: 'filesystem',
    //   cacheDirectory: path.resolve(__dirname, '../../.webpack-tmp'),
    // },
    // NOTE: [Webpack-Devtool](https://webpack.js.org/configuration/devtool/)
    devtool: !isProduction ? 'inline-source-map' : false,
    // NOTICE: 被 NX project 控制住
    // entry: {
    // main: path.resolve(__dirname, '../src/main.tsx'),
    // test: path.resolve(__dirname, '../src/test.ts'),
    // },
    // resolve: {
    //   // NOTICE: important
    //   modules: [
    //     /* assuming that one up is where your node_modules sit,
    //        relative to the currently executing script
    //     */
    //     path.join(__dirname, '../../../node_modules')
    //   ],
    //   extensions: [
    //     '.ts',
    //     '.js' // add this
    //   ]
    // },
    module: {
      rules: [
        {
          test: /\.(ts|js|mjs)x?$/,
          // include: [
          //   path.resolve(__dirname, '../src/test.ts'),
          // path.resolve(__dirname, '../src'),
          // ],
          include(resourcePath, issuer) {
            // NOTE: 測試用
            if (resourcePath.indexOf('sentry') > -1) {
              // console.log("resourcePath", resourcePath);
            }
            // console.log(`  included: ${path.relative(context, resourcePath)} (from ${issuer})`);
            return true; // include all
          },
          exclude: [
            // \\ for Windows, / for macOS and Linux
            /node_modules[\\/]core-js/,
            /node_modules[\\/]webpack[\\/]buildin/,
          ],
          use: [
            // {
            //   loader: 'babel-loader',
            //   options: {
            //     cacheDirectory: false
            //   }
            // },
            {
              loader: AppBabelLoader,
              options: {
                cacheDirectory: false,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
      new webpack.DefinePlugin({
        AppInfo: {
          VERSION: JSON.stringify(gitRevisionPlugin.version()),
          COMMIT_HASH: JSON.stringify(gitRevisionPlugin.commithash()),
          BRANCH: JSON.stringify(gitRevisionPlugin.branch()),
          UI_VERSION: process.env.NODE_UI_VERSION,
        },
      }),
      new MomentTimezoneDataPlugin({
        matchZones: ['Asia/Kolkata', 'Asia/Karachi', 'Asia/Dhaka'],
      }),
      new HtmlWebpackPlugin({
        // 配置 HTML 模板路徑與生成名稱 (第三步)
        template: path.resolve(__dirname, '../src/index.html'),
        'meta': {
          'viewport': 'width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no',
        },
        // favicon: path.resolve(__dirname, `../src/assets/${process.env.NODE_COUNTRY}/favicon.ico`),
        // publicPath: "/v2",
        // chunks: ['runtime', 'vendors', 'common', 'sentry', 'main'],
        // chunks: ['runtime', 'vendors', 'common', 'sentry', 'main', 'errorhandler'],
      }),
      // new PreloadWebpackPlugin({
      //   rel: 'preload',
      //   // include: 'asyncChunks'
      //   include: 'all'
      //   // include: 'initial'
      // }),
      // new CleanWebpackPlugin({
      //   verbose: true,
      // }),
    ],

    target: 'browserslist',
    output: {
      publicPath: PUBLIC_PATH,
      filename: '[name].[contenthash].js',
      // sourceMapFilename: 'maps/[name].[contenthash].map.js'
      assetModuleFilename: `${ASSET_OUTPUT_PATH}/[hash][ext][query]`,
    },
    devServer: {
      host: hostIP,
      port: PORT,
      open: '/',
      hot: true,
      https: true,
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
        '/exapi': {
          target: proxyURL,
          secure: false, // 協議是https的時候必須要寫
          changeOrigin: true,
        },
        "/japi": {
          target: proxyURL,
          secure: false, // 協議是https的時候必須要寫
          changeOrigin: true,
        },
        "/prod-api": {
          target: proxyURL,
          secure: false, // 協議是https的時候必須要寫
          changeOrigin: true,
        },
      },
    },
  });

  finalConfig = merge(finalConfig, {
    optimization: {
      minimize: isProduction,
      minimizer: [
        // new UglifyJsPlugin({
        //   parallel: true,
        //   cache: path.resolve(__dirname, '../../../tmp_uglify'),
        //   // uglifyOptions: {
        //   // warnings: false,
        //   // parse: {},
        //   // compress: {},
        //   // mangle: true, // 注意 `mangle.properties` 的默认值是 `false`。
        //   // output: {
        //   //   comments: /@license/i,
        //   //   comments: false
        //   // },
        //   // toplevel: false,
        //   // nameCache: null,
        //   // ie8: true,
        //   // keep_fnames: false,
        //   // },
        //   extractComments: false,
        // }),
        // NOTICE: minimizer.TerserPlugin 混肴壓縮後 不支援 double question mark
        // NOTICE : [Nullish coalescing / optional chaining support #567](https://github.com/terser/terser/issues/567)
        // new TerserPlugin({
        //   parallel: true,
        //   minify: TerserPlugin.terserMinify,
        //   // minify: TerserPlugin.uglifyJsMinify,
        //   terserOptions: {
        //     compress: {
        //       drop_console: true,
        //     },
        //     format: {
        //       comments: false,
        //     },
        //   },
        //   // NOTICE: the extractComments option is not supported and all comments will be removed by default, it will be fixed in future
        //   extractComments: true,
        // }),
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            filter: (source, sourcePath) => {
              var svgRegExp = new RegExp('.svg$', 'g');
              if (svgRegExp.test(sourcePath)) {
                // console.log('sourcePath', sourcePath);
                return true;
              } else {
                return false;
              }
            },
            options: {
              // Lossless optimization with custom option
              // Feel free to experiment with options for better result for you
              plugins: [
                // ["gifsicle", { interlaced: true }],
                // ["jpegtran", { progressive: true }],
                // ["optipng", { optimizationLevel: 5 }],
                // Svgo configuration here https://github.com/svg/svgo#configuration
                [
                  'svgo',
                  {
                    plugins: [
                      {
                        name: 'preset-default',
                        params: {
                          overrides: {
                            removeViewBox: false,
                            addAttributesToSVGElement: {
                              params: {
                                attributes: [
                                  { xmlns: 'http://www.w3.org/2000/svg' },
                                ],
                              },
                            },
                          },
                        },
                      },
                    ],
                  },
                ],
              ],
            },
          },
        }),
      ],
      runtimeChunk: true,
      splitChunks: {
        cacheGroups: {
          // NOTE: default
          common: {
            name: 'common',
            chunks: 'initial',
            enforce: true,
            // minChunks: 2,
            priority: 3,
          },
          async_common: {
            name: 'common_async',
            chunks: 'async',
            enforce: true,
            // minChunks: 2,
            priority: 3,
          },
          // NOTE: custom
          sentry: {
            test: /[\\/]node_modules[\\/]@sentry*[\\/]/,
            name: 'sentry',
            minChunks: 1,
            priority: 4,
            chunks: 'all',
          },
          rapex: {
            test: /[\\/]node_modules[\\/]react-apexcharts/,
            name: 'react-apex',
            minChunks: 1,
            priority: 2,
            chunks: 'all',
            enforce: true,
          },
          apex: {
            test: /[\\/]node_modules[\\/]apexcharts/,
            name: 'apex',
            minChunks: 1,
            priority: 2,
            chunks: 'all',
            enforce: true,
          },
          vendors: {
            // test: /[\\/]node_modules[\\/](?!@floating-ui+core@1.0.2)/,
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            minChunks: 1,
            priority: 1,
            chunks: 'all',
          },
          // reactLib: {
          //   test: /\/node_modules\/@reduxjs\/toolkit/,
          //   name: 'reactLib',
          //   minChunks: 1,
          //   priority: 2,
          //   chunks: 'all',
          // },
          // nx: {
          //   test: /[\\/]node_modules[\\/]nx/,
          //   name: 'nx',
          //   minChunks: 1,
          //   priority: 2,
          //   chunks: 'all',
          // },
        },
      },
    },
  });

  // NOTICE: Environment
  if (process.env.NODE_ANALYZER) {
    finalConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
      })
    );
  }

  // isProduction
  // if (true) {
    // finalConfig.plugins.push(
    //   new CleanWebpackPlugin({
    //     verbose: true,
    //   })
    // );
  if(isProduction) {
    finalConfig.plugins.push(
      new SentryCliPlugin({
        org: WebpackSentryConfig.org,
        project: WebpackSentryConfig.project,
        authToken: WebpackSentryConfig.authToken,
        debug: true,
        url: WebpackSentryConfig.url,
        include: './dist/apps/gambling',
        ignoreFile: '.sentrycliignore',
        ignore: ['node_modules', 'webpack.config.js'],
        // configFile: 'sentry.properties',
        // setCommits: {
        //   auto: false,
        // ignoreMissing: true,
        // repo: "frontend",
        // commit: gitRevisionPlugin.commithash(),
        // }
      }),
      new function() {
        this.apply = (compiler) => {
            compiler.hooks.done.tap("Log On Done Plugin", () => {
                console.log(("\n[" + new Date().toLocaleString() + "]") + " Begin a new compilation.\n");
            });
        };
    }
    );
  }

  // }

  if (isDashboard) {
    finalConfig.plugins.push(new DashboardPlugin());
  }

  // console.log('finalConfig', finalConfig);
  // console.log('finalConfig.optimization.splitChunks.cacheGroups', finalConfig.optimization.splitChunks.cacheGroups);
  // console.log('finalConfig.module.rules', finalConfig.module.rules);

  finalConfig.module.rules.map((rule, index) => {
    // console.log('before-filter-finalConfig.module.rule', rule);
    if (rule.oneOf) {
      rule.oneOf.map((one) => {
        // console.log('finalConfig.module.rule.one', one);
      });
    }
  });

  const rules = finalConfig.module.rules.filter((rule, index) => {
    return !(index === 0 || index === 1 || index === 2);
  });

  finalConfig.module.rules = rules;

  finalConfig.module.rules.map((rule, index) => {
    // console.log('after-filter-finalConfig.module.rule', rule);
    if (rule.oneOf) {
      rule.oneOf.map((one) => {
        // console.log('finalConfig.module.rule.one', one);
      });
    }
  });

  if (!isProduction) {
    // finalConfig = smp.wrap(finalConfig);
    // console.log('finalConfig.plssugins', finalConfig.plugins);
    // console.log('finalConfig', finalConfig);
    return finalConfig;
  } else {
    // console.log('finalConfig.plugins', finalConfig.plugins);
    // console.log('before finalConfig.optimization.minimizer', finalConfig.optimization.minimizer);
    // NOTICE: 後續要會被加上 TerserPlugin, HashedModuleIdsPlugin, CssMinimizerPlugin
    // NOTICE: 移除 TerserPlugin,
    const minimizers = finalConfig.optimization.minimizer.filter(
      (rule, index) => {
        return !(index === 0);
      }
    );
    finalConfig.optimization.minimizer = minimizers;
    // console.log(
    //   'after finalConfig.optimization.minimizer',
    //   finalConfig.optimization.minimizer
    // );

    // console.log('finalConfig', finalConfig);
    return finalConfig;
  }
};
