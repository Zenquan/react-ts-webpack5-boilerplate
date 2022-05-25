const { resolve, isProd } = require('./utils');
const { loaders } = require('./loaders');
const { plugins } = require('./plugins');
const { optimization } = require('./optimization');
const portfinder = require('portfinder');

const baseConfig = {
  entry: ['react-hot-loader/patch', resolve('src/index.tsx')],
  output: {
    path: resolve('dist'),
    filename: 'assets/js/[name].[contenthash:5].js',
    chunkFilename: 'assets/js/[name].[contenthash:5].js',
  },
  resolve: {
    extensions: ['.tsx', '.ts', 'less', '.css', '.jsx', '.js'],
    alias: {
      '/@': resolve('src'),
      '@': resolve('src'),
    },
  },
  module: {
    rules: loaders,
  },
  plugins,
  optimization,
  target: 'web',
  cache: {
    type: 'filesystem',
    cacheDirectory: resolve('.dist_cache'),
    store: 'pack',
    buildDependencies: {
      defaultWebpack: ['webpack/lib/'],
      config: [__filename],
    },
  },
};

const devConfig = {
  ...baseConfig,
  /**
   * https://webpack.docschina.org/configuration/devtool/#root
   * eval: 具有最高性能的开发构建的推荐选择 generated | build: fast rebuild: fastest
   * eval-cheap-source-map: 开发构建的折衷选择 transformed | build: ok rebuild: fast
   * eval-cheap-module-source-map: 开发构建的折衷选择 original lines | build: slow rebuild: fast
   */
  devtool: 'eval-cheap-module-source-map',
  output: {
    filename: '[name].js',
  },
  devServer: {
    https: true,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: { '^/api': '' },
        secure: false,
        changeOrigin: true,
      },
    },
    inline: true,
    historyApiFallback: true,
  },
  watchOptions: {
    ignored: 'node_modules/**',
  },
};

const prodConfig = {
  ...baseConfig,
  /* CDN http://www.staticfile.org/
    https://cdnjs.com/
    https://www.jsdelivr.com/
    */
  externals: [
    // {
    //   'react': 'React',
    //   'react-dom': 'ReactDOM',
    //   'react-router-dom': 'ReactRouterDOM',
    // }
  ],
};

module.exports = new Promise((resolve, reject) => {
  isProd
    ? resolve(prodConfig)
    : portfinder.getPort((err, port) => {
        if (err) {
          reject(err);
          return;
        }

        //端口被占用时就重新设置evn和devServer的端口
        devConfig.devServer.port = process.env.PORT = port;

        resolve(devConfig);
      });
});
