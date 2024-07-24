const { merge } = require('webpack-merge');
const config = require('./config.common');

const prodConfig = {
   output: {
      filename: 'js/[name].[contenthash:12].js',
   },
   mode: 'production',
   optimization: {
      minimize: true,
      runtimeChunk: 'single',
      splitChunks: {
         maxSize: Infinity,
         minSize: 2000,
         cacheGroups: {
            node_modules: {
               test: /[\\/]node_modules[\\/]/,
               name: 'node_modules',
            }
         }
      }
   },
};

module.exports = merge(config, prodConfig);