const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const swcConfig = require('./.swcrc');
const { isProd, resolve } = require('./utils');

const cssLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 1,
    modules: {
      mode: 'local',
      auto: true,
      exportGlobals: true,
      localIdentName: '[local]--[hash:base64:5]',
    },
  },
};

const loaders = [
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
    use: [MiniCssExtractPlugin.loader, cssLoader, 'postcss-loader'],
    include: /\.module\.css$/,
  },
  {
    test: /\.(png|jpeg|jpg|bmp|gif|svg)$/,
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
          limit: 200 * 1024,
          name: '[name].[contenthash:8].[ext]',
          outputPath: 'assets/fonts',
        },
      },
    ],
  },
  {
    test: /\.(ogg|mp3|wav|mpe?g)$/i,
    loader: 'url-loader',
    options: {
      limit: 200 * 1024,
      name: 'assets/media/[name].[ext]',
    },
  },
  {
    test: /\.less$/,
    use: [MiniCssExtractPlugin.loader, cssLoader, 'less-loader'],
  },
  {
    test: /\.(js|jsx|ts|tsx)$/,
    use: [
      {
        loader: 'swc-loader',
        options: swcConfig(!isProd),
      },
    ],
    exclude: /node_modules/,
    include: [resolve('src')],
  },
];

module.exports = {
  loaders,
};
