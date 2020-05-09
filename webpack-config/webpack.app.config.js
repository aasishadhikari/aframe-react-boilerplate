const path = require('path');
const merge = require('lodash.merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BaseConfig = require('./webpack.base.config');
const config = require('../src/config/general.js');

const AppTemplate = {
  entry: ['@babel/polyfill', './src/app.js'],
  output: {
    publicPath: config.basePath,
    path: path.join(__dirname, '../build'),
    filename: 'app.js'
  },
  devtool: 'eval',
  plugins: [
    new MiniCssExtractPlugin({ filename: 'style.css' }),
    new CopyWebpackPlugin([{ from: 'src/public', to: '.' }]),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '../src/views/index.pug'),
      filename: 'index.html',
      hash: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        include: /src/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]'
              },
              localsConvention: 'camelCase'
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.pug/,
        use: 'pug-loader'
      }
    ]
  }
};

var appConfig = merge({}, BaseConfig, AppTemplate);
appConfig.module.rules = BaseConfig.module.rules.concat(
  AppTemplate.module.rules
);

module.exports = appConfig;
