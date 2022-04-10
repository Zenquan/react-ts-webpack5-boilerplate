const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { resolve } = require('./utils');

const loaders = [
  {
    test: /\.(js|jsx)$/,
    use: [
      'cache-loader',
      {
        loader: 'thread-loader',
        options: {
          // the number of spawned workers, defaults to (number of cpus - 1) or
          // fallback to 1 when require('os').cpus() is undefined
          workers: 4,

          // number of jobs a worker processes in parallel
          // defaults to 20
          workerParallelJobs: 50,

          // additional node.js arguments
          workerNodeArgs: ['--max-old-space-size=1024'],

          // Allow to respawn a dead worker pool
          // respawning slows down the entire compilation
          // and should be set to false for development
          poolRespawn: false,

          // timeout for killing the worker processes when idle
          // defaults to 500 (ms)
          // can be set to Infinity for watching builds to keep workers alive
          poolTimeout: 2000,

          // number of jobs the poll distributes to the workers
          // defaults to 200
          // decrease of less efficient but more fair distribution
          poolParallelJobs: 50,

          // name of the pool
          // can be used to create different pools with elsewise identical options
          name: 'my-pool',
        },
      },
      'babel-loader',
    ],
    exclude: /node_modules/,
    include: [resolve('src')],
  },
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
          limit: 10 * 1024,
          name: '[name].[contenthash:8].[ext]',
          outputPath: 'assets/fonts',
        },
      },
    ],
  },
  {
    test: /\.(ogg|mp3|wav|mpe?g)$/i,
    loader: 'url-loader',
    query: {
      limit: 1024 * 200,
      name: 'assets/media/[name].[ext]',
    },
  },
  {
    test: /\.svg$/,
    use: 'file-loader',
  },
  {
    test: /\.ts(x)?$/,
    use: [
      'cache-loader',
      // {
      //   loader: 'thread-loader',
      //   options: {
      //     // the number of spawned workers, defaults to (number of cpus - 1) or
      //     // fallback to 1 when require('os').cpus() is undefined
      //     workers: 2,

      //     // number of jobs a worker processes in parallel
      //     // defaults to 20
      //     workerParallelJobs: 50,

      //     // additional node.js arguments
      //     workerNodeArgs: ['--max-old-space-size=1024'],

      //     // Allow to respawn a dead worker pool
      //     // respawning slows down the entire compilation
      //     // and should be set to false for development
      //     poolRespawn: false,

      //     // timeout for killing the worker processes when idle
      //     // defaults to 500 (ms)
      //     // can be set to Infinity for watching builds to keep workers alive
      //     poolTimeout: 2000,

      //     // number of jobs the poll distributes to the workers
      //     // defaults to 200
      //     // decrease of less efficient but more fair distribution
      //     poolParallelJobs: 50,

      //     // name of the pool
      //     // can be used to create different pools with elsewise identical options
      //     name: 'my-pool',
      //   },
      // },
      'ts-loader',
    ],
    exclude: /node_modules/,
    include: [resolve('src')],
  },
  {
    test: /\.less$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
  },
];

module.exports = {
  loaders,
};
