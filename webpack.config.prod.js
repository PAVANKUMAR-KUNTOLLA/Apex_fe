const path = require("path");
const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const AsyncChunkNames = require("webpack-async-chunk-names-plugin");

module.exports = {
  mode: "production",
  context: __dirname,
  entry: {
    "/src": ["babel-polyfill", "./src/Index.js"],
  },
  devtool: "source-map",
  output: {
    path: path.join(__dirname, "static/js/"),
    filename: "main.js",
    chunkFilename: "[name].js",
    publicPath: "/static/js/",
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".css"],
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("prod"),
      },
    }),
    new AsyncChunkNames(),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          ecma: 6,
        },
      }),
    ],
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
  module: {
    rules: [
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
};
