const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'inline-source-map',
  plugins: [
    new MiniCssExtractPlugin(),
    new TerserWebpackPlugin(),
    new OptimizeCssAssetsWebpackPlugin(),
    new HtmlWebpackPlugin(
      {
        template: './src/index.pug',
        filename: 'index.html'
      }
    )
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin()
    ]
  },

  module: {
    rules: [
      {
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            esModule: true
          }
        }, 'css-loader'],
        test: /\.css$/
      },
      {
        test: /\.pug$/,
        use: 'pug-loader'
      },
      {
        test: /\.ts$/,
        use: 'ts-loader'
      }
    ]
  }
});