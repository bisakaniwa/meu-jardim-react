const { merge } = require('webpack-merge');
const path = require('path');
const config = require('./config.common');

const devConfig = {
   output: {
      filename: 'bundle.js',
   },
   mode: 'development',
   devtool: 'eval-source-map',
   devServer: {
      port: 7000,
      static: {
         directory: path.resolve(__dirname, '../bundle'),
      },
      devMiddleware: {
         index: 'index.html',
         writeToDisk: true,
      },
      client: {
         overlay: true,
      },
      liveReload: false,
   },
   module: {
      rules: [
         {
            test: /\.(png|jpg|svg)$/,
            type: 'asset',
            parser: {
               dataUrlCondition: {
                  maxSize: 10 * 1024,
               },
            },
            generator: {
               filename: './images/[name].[ext]',
            },
         }
      ]
   }
};

module.exports = merge(config, devConfig);