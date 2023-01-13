// .swcrc.js

const path = require('path');

module.exports = (isDev = false) => {
  // swc polyfill 策略，会复用 babel 链路，但效率比 babel 低
  const polyfillConfig = isDev
    ? {}
    : {
        env: {
          mode: 'usage', // or entry
          coreJs: 3,
          path: path.resolve(__dirname),
        },
      };

  return {
    module: {
      type: 'es6',
      ignoreDynamic: true,
    },
    // polyfill
    // ...polyfillConfig,
    jsc: {
      parser: {
        syntax: 'typescript',
        dynamicImport: true,
        decorators: true,
        tsx: true,
      },
      loose: true,
      target: 'es2015',
      externalHelpers: true,
      transform: {
        legacyDecorator: true,
        decoratorMetadata: true,
        react: {
          runtime: 'automatic', // or classic
          throwIfNamespace: true,
          useBuiltins: true,
          development: isDev,
        },
      },
    },
  };
};
