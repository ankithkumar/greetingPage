const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname, './src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre",
        exclude: [/@uirouter/]
      },
      // babel-loader with 'env' preset
      { test: /\.js$/, include: /src/, exclude: /node_modules/, use: { loader: "babel-loader", options: { presets: ['env'] } } },
      {
        test: /\.scss$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })        
      },
      { test: /\.css$/,
         use: [
          { loader: 'style-loader'},
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }]
      },
      {
        test: /.html$/,
        exclude: /index.html$/,
        use: 'html-loader'
      }
    ]
  },
  plugins: [
    // cleaning up only 'dist' folder
    new CleanWebpackPlugin(['dist']),
    new ExtractTextWebpackPlugin('styles.css'),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true
    })
  ],
  devServer: {
    // static files served from here
    contentBase: path.resolve(__dirname, "./dist/index.html"),
    compress: true,
    // open app in localhost:2000
    port: 8002,
    stats: 'errors-only',
    open: true
  },
  devtool: 'source-map'

};