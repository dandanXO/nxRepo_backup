// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = MiniCssExtractPlugin.loader;

const mockAPIResponse = require("../src/api/demo/mockApi.json");

const config = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "../dist"),
    },
    devServer: {
        hot: true,
        open: true,
        host: "localhost",
        port: 9000,
        historyApiFallback: true,
        onBeforeSetupMiddleware: function (devServer) {
            if (!devServer) {
                throw new Error("webpack-dev-server is not defined");
            }
            // NOTICE: demo
            devServer.app.get("/open-api/zh-tw/Attractions/All", (req, res) => {
                res.json(mockAPIResponse);
            });
        },
        proxy: {
            //设置代理
            "/api": {
                target: "https://app.india-api-dev.com",
                secure: false, // 協議是https的時候必須要寫
                changeOrigin: true,
            },
        },
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "index.html",
        }),

        new MiniCssExtractPlugin(),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: "ts-loader",
                exclude: ["/node_modules/"],
                options: {
                    configFile: path.resolve(__dirname, "../tsconfig.json"),
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    stylesHandler,
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, "css-loader", "postcss-loader"],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: "asset",
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = "production";
    } else {
        config.mode = "development";
    }
    return config;
};
