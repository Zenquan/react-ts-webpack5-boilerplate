const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const swcConfig = require('./.swcrc');
const { isProd } = require('./utils');

const loaders = [
  // {
  //   test: /\.(js|jsx)$/,
  //   use: ['cache-loader', 'babel-loader'],
  //   exclude: /node_modules/,
  // },
  {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
        },
      },
      'postcss-loader',
    ],
    exclude: /\.module\.css$/,
  },
  {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          importLoaders: 1,
          modules: true,
        },
      },
      'postcss-loader',
    ],
    include: /\.module\.css$/,
  },
  {
    test: /\.(png|jpeg|jpg|bmp|gif)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10 * 1024,
          name: '[name].[contenthash:8].[ext]',
          outputPath: 'assets/images',
        },
      },
    ],
  },
  {
    test: /\.(ttf|woff|woff2|eot|otf)$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          name: '[name].[contenthash:8].[ext]',
          outputPath: 'assets/fonts',
        },
      },
    ],
  },
  {
    test: /\.svg$/,
    use: 'file-loader',
  },
  // {
  //   test: /\.ts(x)?$/,
  //   loader: 'ts-loader',
  //   exclude: /node_modules/,
  // },
  {
    test: /\.less$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
  },
  {
    test: /\.(js|jsx|ts|tsx)$/,
    loader: 'swc-loader',
    options: swcConfig(!isProd),
    exclude: /node_modules/,
  },
];

module.exports = {
  loaders,
};
