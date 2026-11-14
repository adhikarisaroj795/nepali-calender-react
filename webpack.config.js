const path = require("path");
const webpack = require("webpack");

const babelRule = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader",
    options: {
      cacheDirectory: true,
    },
  },
};

// 1. The React build: calendar component + conversion functions.
const reactBuild = {
  name: "react",
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
      babelRule,
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

// 2. Conversion only, no React. Works with require() in Node and with a
//    <script> tag in a plain HTML page (global: NepaliDateConverter).
const converterBuild = {
  name: "converter",
  entry: "./src/converter.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "convert.js",
    library: {
      name: "NepaliDateConverter",
      type: "umd",
    },
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
  module: {
    rules: [babelRule],
  },
};

// 3. The same conversion code as an ES module, for `import { adToBs }`.
const converterModuleBuild = {
  name: "converter-module",
  entry: "./src/converter.js",
  experiments: {
    outputModule: true,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "convert.mjs",
    library: {
      type: "module",
    },
  },
  module: {
    rules: [babelRule],
  },
};

// 4. The calendar for pages without React (plain HTML, Vue, Svelte...).
//    The component is the same one; a small React-compatible library
//    (Preact) is bundled inside so nothing else has to be installed.
const standaloneShared = {
  entry: "./src/standalone.js",
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
      "react/jsx-runtime": "preact/jsx-runtime",
    },
  },
  module: {
    rules: [
      babelRule,
      {
        test: /\.css$/,
        use: [{ loader: "css-loader", options: { exportType: "string" } }],
      },
    ],
  },
};

// <script> tag (global: NepaliDatePicker) and require()
const standaloneBuild = {
  ...standaloneShared,
  name: "standalone",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "standalone.js",
    library: {
      name: "NepaliDatePicker",
      type: "umd",
    },
    globalObject: "typeof self !== 'undefined' ? self : this",
  },
};

// import { create } from ".../standalone"
const standaloneModuleBuild = {
  ...standaloneShared,
  name: "standalone-module",
  experiments: {
    outputModule: true,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "standalone.mjs",
    library: {
      type: "module",
    },
  },
};

module.exports = [
  reactBuild,
  converterBuild,
  converterModuleBuild,
  standaloneBuild,
  standaloneModuleBuild,
];
