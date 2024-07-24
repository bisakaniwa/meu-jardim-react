const { merge } = require('webpack-merge');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const production = require('./config.prod');

const analyzer = {
   plugins: [
      new BundleAnalyzerPlugin({
         analyzerMode: 'server',
         openAnalyzer: true,
      }),
   ],
};

module.exports = merge(production, analyzer);