const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const swcConfig = require('./.swcrc');
const { isProd, resolve } = require('./utils');
const { LightningCssMinifyPlugin } = require('lightningcss-loader')
const LightningCSS = require('lightningcss')

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
      {
        loader: 'lightningcss-loader',
        options: {
          implementation: LightningCSS
        }
      }
    ],
    exclude: /\.module\.css$/,
  },
  {
    test: /\.css$/,
    use: [
      MiniCssExtractPlugin.loader,
      cssLoader,
      {
        loader: 'lightningcss-loader',
        options: {
          implementation: LightningCSS
        }
      }],
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
      'cache-loader',
      {
        loader: 'thread-loader',
        // 有同样配置的 loader 会共享一个 worker 池
        options: {
          // 产生的 worker 的数量，默认是 (cpu 核心数 - 1)，或者，
          // 在 require('os').cpus() 是 undefined 时回退至 1
          workers: require('os').cpus(),

          // 一个 worker 进程中并行执行工作的数量
          // 默认为 20
          workerParallelJobs: 50,

          // 额外的 node.js 参数
          workerNodeArgs: ['--max-old-space-size=1024'],

          // 允许重新生成一个僵死的 work 池
          // 这个过程会降低整体编译速度
          // 并且开发环境应该设置为 false
          poolRespawn: false,

          // 闲置时定时删除 worker 进程
          // 默认为 500（ms）
          // 可以设置为无穷大，这样在监视模式(--watch)下可以保持 worker 持续存在
          poolTimeout: 2000,

          // 池分配给 worker 的工作数量
          // 默认为 200
          // 降低这个数值会降低总体的效率，但是会提升工作分布更均一
          poolParallelJobs: 50,

          // 池的名称
          // 可以修改名称来创建其余选项都一样的池
          name: 'my-pool',
        },
      },
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
