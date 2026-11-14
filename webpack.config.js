const path = require("path");
const webpack = require("webpack");

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
    "react/jsx-runtime": "react/jsx-runtime",
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
        // The CSS is bundled as a plain string and added to the page by
        // src/utils/injectStyles.js (only in the browser).
        test: /\.css$/,
        use: [
          {
            loader: "css-loader",
            options: {
              exportType: "string",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // Lets the component work in the Next.js App Router without extra setup.
    new webpack.BannerPlugin({
      banner: '"use client";',
      raw: true,
      // add it after minification so it stays the first line of the file
      stage: webpack.Compilation.PROCESS_ASSETS_STAGE_REPORT,
    }),
  ],
};
