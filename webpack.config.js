const path = require('path');
const HTMLWebpuckPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  //Context - set default path for all files
  context: path.resolve(__dirname, 'src'), 

  //Mode - set webpack config mode
  mode: 'development',

  //Entry - set entry files names
  entry: {
    main: './index.js',
    analytics: './analytics.js'
  },

  //Output - set output files names and path
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },

  //Resolve - set default files types
  resolve: {
    extensions: ['.js', '.json', 'png', 'svg', 'css'],
    alias: {
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@Roboto': path.resolve(__dirname, 'src/assets/fonts/Roboto')
    }
  },

  //Optimizations - use for libraries optimization to split same in on file
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },

  //devServer - set configuration for dev server
  devServer: {
    port: 4200
  },

  //Plugins - set diff plagins for webpack
  plugins: [
    new HTMLWebpuckPlugin({
      template: './index.html'
    }),
    new CleanWebpackPlugin()
  ],
  
  // ADD modules - use for diff files load in js files
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, 
      {
        test: /\.(png|jpeg|jpg|gif|svg)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: ['file-loader']
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      }, 
      {
        test: /\.scv$/, 
        use: ['scv-loader']
      }
    ]
  }
}