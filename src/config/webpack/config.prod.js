const { merge } = require('webpack-merge');
const config = require('./config.common');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');

const prodConfig = {
   output: {
      filename: 'js/[name].[contenthash:12].js',
   },
   mode: 'production',
   optimization: {
      minimize: true,
      minimizer: [
         `...`,
         new ImageMinimizerPlugin({
            minimizer: {
               implementation: ImageMinimizerPlugin.imageminMinify,
               options: {
                  plugins: [
                     ['imagemin-jpegtran', { quality: 40, progressive: true }],
                     ['imagemin-optipng', {
                        quality: [0.65, 0.90],
                        speed: 4,
                        optimizationLevel: 5,
                     }],
                     ['imagemin-gifsicle', { interlaced: true }],
                     ['imagemin-svgo', {
                        plugins: [
                           {
                              name: 'preset-default',
                              params: {
                                 overrides: {
                                    removeViewBox: false,
                                    addAttributesToSVGElement: {
                                       params: {
                                          attributes: [
                                             { xmlns: 'http://www.w3.org/2000/svg' },
                                          ],
                                       },
                                    },
                                 },
                              },
                           },
                        ],
                     }],
                  ],
               },
            },
         }),
      ],
      runtimeChunk: 'single',
      splitChunks: {
         maxSize: Infinity,
         minSize: 2000,
         cacheGroups: {
            node_modules: {
               test: /[\\/]node_modules[\\/]/,
               name: 'node_modules',
            },
            images: {
               test: /\.(png|jpe?g|gif|svg|avif)$/,
               name: 'static-images',
            },
         },
      },
   },
   module: {
      rules: [
         {
            test: /\.(png|jpe?g|gif|svg|avif)$/,
            type: 'asset',
            parser: {
               dataUrlCondition: {
                  maxSize: 10 * 1024,
               },
            },
            generator: {
               filename: './images/[name].[contenthash:12].[ext]',
            },
         },
      ],
   },
};

module.exports = merge(config, prodConfig);