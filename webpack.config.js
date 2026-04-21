const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/js/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // Garante que os caminhos no HTML sejam relativos à raiz
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'imagens/[name][ext]'
        }
      },
      {
        test: /\.(mp3|wav|ogg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'media/[name][ext]'
        }
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/media', to: 'media' },
        { from: 'src/imagens', to: 'imagens' },
      ],
    }),
  ],
  resolve: {
    alias: {
      '@src': path.resolve(__dirname, 'src/'),
      'jquery': path.resolve(__dirname, 'src/vendor/jquery/jquery.min.js'),
      'popper.js': path.resolve(__dirname, 'src/vendor/popper/popper.min.js'),
      'bootstrap': path.resolve(__dirname, 'src/vendor/bootstrap/js/bootstrap.bundle.min.js'),
    },
  },
  devServer: {
    static: './dist',
    hot: true,
    open: true,
  },
};