const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { spawn } = require('child_process');

const SRC_DIR = path.resolve(__dirname, '../src');
const OUTPUT_DIR = path.resolve(__dirname, '../dist');
const ANTD_DIR = path.resolve(__dirname, '../node_modules/antd');
const defaultInclude = [SRC_DIR];
const styleInclude = [SRC_DIR, ANTD_DIR];

module.exports = {
  entry: SRC_DIR + '/index.js',
  output: {
    path: OUTPUT_DIR,
    publicPath: '/',
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
        include: styleInclude,
      },
      {
        test: /\.js?$/,
        use: [{ loader: 'babel-loader' }, { loader: 'eslint-loader' }],
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  externals: {
    usb: 'commonjs usb',
  },
  devtool: 'cheap-source-map',
  devServer: {
    contentBase: OUTPUT_DIR,
    stats: {
      colors: true,
      chunks: false,
      children: false,
    },
    before() {
      spawn('electron', ['.'], {
        shell: true,
        env: process.env,
        stdio: 'inherit',
      })
        .on('close', code => process.exit(0))
        .on('error', spawnError => console.error(spawnError));
    },
  },
};
