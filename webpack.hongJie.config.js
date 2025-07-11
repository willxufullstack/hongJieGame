const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (function (options) {
  const isProduction = process.env.NODE_ENV === 'production';
  
  return {
    entry: {
      main: path.resolve("src/index.ts")
    },

    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      publicPath: './'
    },

    devtool: isProduction ? false : 'source-map',

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
