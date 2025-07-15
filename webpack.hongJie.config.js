const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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

    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      }),
      new CopyWebpackPlugin([
        { from: 'assets', to: 'assets' },
        { from: 'src/sitemap.xml', to: 'sitemap.xml' },
        { from: 'src/robots.txt', to: 'robots.txt' },
        { from: 'src/manifest.json', to: 'manifest.json' },
        { from: 'src/config.js', to: 'config.js' }
      ])
    ],

    resolve: {
      extensions: ['.ts', '.js', '.json']
    }

  }
})();
