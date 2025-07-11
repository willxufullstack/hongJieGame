const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (function (options) {
  return {
    entry: {
      main: path.resolve("src/index.ts")
    },

    output: {
      path: __dirname + "/dist",
      filename: "bundle.js"
    },

    devtool: false,

    module: {
      rules: [{
          test: /\.ts$/,
          loader: "ts-loader"
        }
      ]
    },

    plugins: [new HtmlWebpackPlugin({
      template: 'src/index.html'
    })],

    resolve: {
      extensions: ['.ts', '.js', '.json']
    }

  }
})();
