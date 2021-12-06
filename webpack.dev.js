const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const webpack = require("webpack");
// const DevServer = require("webpack-dev-server");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
   mode: 'development',
   devtool: 'inline-source-map',
   devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 3001,
    // stats: {
    //   children: false,
    //   maxModules: 0
    // }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin(
      {
        template: './src/index.pug',
        filename: 'index.html'
      }
    )
  ],
});