const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BabiliPlugin = require('babili-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const SRC_DIR = path.resolve(__dirname, 'src');
const OUTPUT_DIR = path.resolve(__dirname, 'dist');
const ANTD_DIR = path.resolve(__dirname, 'node_modules/antd');
const defaultInclude = [SRC_DIR];
const styleInclude = [SRC_DIR, ANTD_DIR];

module.exports = {
  entry: SRC_DIR + '/index.js',
  output: {
    path: OUTPUT_DIR,
    publicPath: './',
    filename: 'bundle.js',
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
        include: styleInclude,
      },
      {
        test: /\.js?$/,
        use: [{ loader: 'babel-loader' }],
        include: defaultInclude,
      },
      {
        test: /\.svg$/,
        use: [
          { loader: 'babel-loader' },
          { loader: 'react-svg-loader', options: { jsx: true } },
        ],
        include: defaultInclude,
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [{ loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]' }],
        include: defaultInclude,
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          { loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' },
        ],
        include: defaultInclude,
      },
    ],
  },
  target: 'electron-renderer',
  plugins: [
    new HtmlWebpackPlugin(),
    new ExtractTextPlugin('bundle.css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new BabiliPlugin(),
  ],
  externals: {
    usb: 'commonjs usb',
  },
  stats: {
    colors: true,
    children: false,
    chunks: false,
    modules: false,
  },
};
