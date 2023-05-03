const webpack = require("webpack");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { GitRevisionPlugin } = require("git-revision-webpack-plugin");
const SentryCliPlugin = require("@sentry/webpack-plugin");
const getClientEnvironment = require("./getClientEnvironment");
// const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
// const webpackConfig = require('@nrwl/react/plugins/webpack');
// const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";
const gitRevisionPlugin = new GitRevisionPlugin();


console.info("[mobile][build]");
console.log("[mobile][build] process.env.NODE_ENV:", process.env.NODE_ENV);
console.log("[mobile][build] process.env.NODE_COUNTRY:", process.env.NODE_COUNTRY);
console.log("[mobile][build] isProduction: ", isProduction);
console.log("[mobile][build] getClientEnvironment", getClientEnvironment());
// console.log("gitRevisionPlugin.commithash()", gitRevisionPlugin.commithash());


// NOTE:
let PUBLIC_PATH;
PUBLIC_PATH = !isProduction ? "/" : "/v1/";
// PUBLIC_PATH = !isProduction ? "/" : "/";

console.log("[mobile][build] PUBLIC_PATH", PUBLIC_PATH);

let proxyURL;
if(process.env.NODE_COUNTRY === "in") {
  proxyURL = "https://app.india-api-dev.com";
} else if(process.env.NODE_COUNTRY === "pk") {
  proxyURL = "https://app.pk-api-dev.com";
} else if(process.env.NODE_COUNTRY === "bd") {
  proxyURL = "https://app.bd-api-dev.com";
}

module.exports = (config, context) => {
    const finalConfig = merge(config, {
        // devtool: false,
        // devtool: !isProduction ? "cheap-module-eval-source-map" : "source-map",
        devtool: "source-map",
        output: {
            filename: "[name].[contenthash].js",
            // sourceMapFilename: 'maps/[name].[contenthash].map.js',
            // assetModuleFilename: `${ASSET_OUTPUT_PATH}/[hash][ext][query]`,
            publicPath: PUBLIC_PATH,
        },
        module: {
            rules: [
              // NOTE: Other Loader
              {
                test: /\.(css|less)$/,
                use: [
                  "style-loader",
                  "css-loader",
                  {
                    loader: "less-loader",
                    options: {
                      lessOptions: {
                        javascriptEnabled: true,
                      },
                    },
                  },
                ],
              },
              // NOTICE: 待釐清css preprocess
              {
                test: /\.(s[ac]ss)$/,
                use: [
                  "style-loader",
                  "css-loader",
                  'sass-loader',
                ],
              },
              // NOTE: type: "asset/resource",
              {
                test: /\.(png|jpe?g|gif)$/,
                type: "asset/resource",
                generator: {
                  filename: "static/img/[name].[contenthash:8][ext]",
                },
              },
              {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: "asset/resource",
                generator: {
                  filename: "static/font/[name].[contenthash:8][ext]",
                },
              },
              {
                test: /\.ico$/,
                type: "asset/resource",
                generator: {
                  filename: "static/ico/[name].[contenthash:8].ico",
                },
              },
            ],
        },
        devServer: {
            hot: true,
            open: true,
            host: "localhost",
            // NOTE: REFACTOR ME
            port: 4001,
            historyApiFallback: true,
            static: {
              directory: "/"
            },
            onBeforeSetupMiddleware: function (devServer) {
                if (!devServer) {
                    throw new Error("webpack-dev-server is not defined");
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
            new webpack.DefinePlugin({
                appInfo: {
                    VERSION: JSON.stringify(gitRevisionPlugin.version()),
                    COMMITHASH: JSON.stringify(gitRevisionPlugin.commithash()),
                    BRANCH: JSON.stringify(gitRevisionPlugin.branch()),
                    PUBLIC_PATH: JSON.stringify(PUBLIC_PATH),
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
        ],
    });
    if (isProduction) {
        //   finalConfig.plugins.push(
        //     new CleanWebpackPlugin({
        //       verbose: true,
        //     })
        //   );
        finalConfig.plugins.push(
          new HtmlWebpackPlugin({
            // 配置 HTML 模板路徑與生成名稱 (第三步)
            template: './src/index.html',
            filename: 'index.html',
            // publicPath: "/v2",
          }),
        );
        finalConfig.plugins.push(
            new SentryCliPlugin({
                debug: false,
                authToken:
                    "82a0bb80a6d641f3adb38163f31bc6d87e2fbd4ef0d64dde9ddfc135e3c0c6c0",
                org: "workshop-xs",
                project: "api-mobile",
                include: "./dist/apps/mobile",
                ignoreFile: ".sentrycliignore",
                ignore: ["node_modules", "webpack.config.js"],
                configFile: "sentry.properties",
                // setCommits: {
                //   auto: false,
                // ignoreMissing: true,
                // repo: "frontend",
                // commit: gitRevisionPlugin.commithash(),
                // }
            })
        );
    }
    // console.log("[mobile][build] finalConfig", finalConfig);
    return finalConfig;
};
