const esbuild = require('esbuild');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const { isProd } = require('./utils');

const devOptimization = {
  runtimeChunk: true,
};

const prodOptimization = {
  minimize: true,
  splitChunks: {
    chunks: 'all',
    cacheGroups: {
      react: {
        name: 'chunk-react',
        priority: 20,
        test: /[\\/]node_modules[\\/]_?react(.*)/,
      },
    },
  },
  minimizer: [
    new ESBuildMinifyPlugin({
      target: 'es2015',
      legalComments: 'none', // 去除注释
      css: true, // 压缩 css
      implementation: esbuild, // 自定义 esbuild instance 实现
    }),
  ],
};

module.exports = {
  optimization: isProd ? prodOptimization : devOptimization,
};
