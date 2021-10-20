const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

module.exports = {
  entry: "./lib/index.ts",
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.wasm' ],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, "."),
    }),
  ],
  experiments: {
    asyncWebAssembly: true,
    syncWebAssembly: true,
  },
  mode: "development",
};
