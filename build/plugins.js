const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('./utils');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackBar = require('webpackbar');
const { isProd } = require('./utils');

const basePlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new FriendlyErrorsPlugin(),
  new WebpackBar(),
];

const devPlugins = [
  new HtmlWebpackPlugin({
    title: 'reactAmdmin 后台系统方案',
    template: resolve('public/index.html'),
  }),
  new MiniCssExtractPlugin(),
];

const prodPlugins = [
  new HtmlWebpackPlugin({
    title: 'reactAmdmin 后台系统方案',
    template: resolve('public/index.html'),
    env: 'production',
    minify: true,
  }),
  new MiniCssExtractPlugin({
    filename: 'assets/css/[name].[contenthash:5].css',
    chunkFilename: 'assets/css/[name].[chunkhash:5].css',
  }),
  // new BundleAnalyzerPlugin({
  //   analyzerMode: 'static',
  //   openAnalyzer: false,
  // }),
];

const plugins = basePlugins.concat(isProd ? prodPlugins : devPlugins);

module.exports = {
  plugins,
};
