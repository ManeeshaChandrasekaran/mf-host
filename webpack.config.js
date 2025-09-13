const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
      serveIndex: false,        
    },
    port: 3000,
    historyApiFallback: true,
    compress: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  output: {
    publicPath: 'http://localhost:3000/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react', '@babel/preset-typescript'],
        },
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
      },
       exposes: {
        './store': './src/store/index', 
      },
      shared: {
        react: { singleton: true, eager: true },
        'react-dom': { singleton: true, eager: true },
        'react-router-dom': { singleton: true, eager: true },
        '@reduxjs/toolkit': { singleton: true },
        'react-redux': { singleton: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
};