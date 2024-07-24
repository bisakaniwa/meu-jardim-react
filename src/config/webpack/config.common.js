const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const config = {
   entry: './src/index.tsx',
   output: {
      path: path.resolve(__dirname, '../build'),
   },
   resolve: {
      extensions: ['.ts', '.js', '.tsx', '.jsx'],
   },
   module: {
      rules: [
         {
            test: /\.html$/,
            use: [
               {
                  loader: 'html-loader',
               }
            ]
         },
         {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: [
               {
                  loader: 'babel-loader',
                  options: {
                     presets: ['@babel/preset-env', '@babel/preset-react'],
                     plugins: ['@babel/plugin-transform-runtime'],
                  },
               },
               {
                  loader: 'ts-loader',
                  options: {
                     transpileOnly: true,
                  },
               },
            ],
         },
         {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
               options: {
                  presets: ['@babel/preset-env', '@babel/preset-react'],
                  plugins: ['@babel/plugin-transform-runtime'],
               },
            },
         },
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
         }
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         filename: 'index.html',
         template: 'public/index.html',
      }),
      new CleanWebpackPlugin(),
   ],
};

module.exports = config;