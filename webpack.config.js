const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");
const AsyncChunkNames = require("webpack-async-chunk-names-plugin");

module.exports = {
  mode: "development",
  entry: ["babel-polyfill", "./src/Index.js"],
  devtool: "cheap-eval-source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    chunkFilename: "[name].js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".css"],
  },
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true,
    proxy: {
      "/users/api/v1": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        secure: false,
      },
      "/api/v1": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        secure: false,
      },
      "/api": {
        target: "http://127.0.0.1:8000",
        pathRewrite: { "^/api": "" },
        changeOrigin: true,
        secure: false,
      },
      "/ws/reports": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  module: {
    rules: [
      {
        enforce: "pre",
        test: /\.jsx?$/,
        loader: "eslint-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({ template: "./index.html" }),
    new AsyncChunkNames(),
  ],
  // optimization
  optimization: {
    moduleIds: "hashed",
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        // vendor chunk
        vendor: {
          name: "vendor",
          // async + async chunks
          chunks: "all",
          // import file path containing node_modules
          test: /node_modules/,
          priority: 20,
        },
      },
    },
  },
};
