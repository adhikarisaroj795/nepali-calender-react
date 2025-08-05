const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    libraryTarget: "umd",
    globalObject: "this",
    library: "NepaliCalendarReact",
  },
  externals: {
    react: "react",
    "react-dom": "react-dom",
    "prop-types": "prop-types",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: false,
            },
          },
        ],
      },
    ],
  },
  plugins: isProduction
    ? [
        new MiniCssExtractPlugin({
          filename: "styles/nepalicalender.css",
          chunkFilename: "[id].css",
        }),
      ]
    : [],
  optimization: {
    minimize: isProduction,
  },
};
