const path = require('path');
const fs = require('fs')
const HTMLWebpuckPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  let config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsPlugin(),
      new TerserWebpackPlugin()
    ]
  }

  return config;
}

const fileName = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`; 

const cssLoaders = extra => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true 
      }
    }, 
    'css-loader'
  ]; 

  if (extra) {
    loaders.push(extra); 
  }

  return loaders;
}

const generateHtmlPlugins = (templateDir) => {
  // Read files in template directory
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
  return templateFiles.map(item => {
    // Split names and extension
    const parts = item.split('.')
    const name = parts[0]
    const extension = parts[1]
    // Create new HTMLWebpuckPlugin with options
    return new HTMLWebpuckPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`)
    })
  })
}

module.exports = {
  //Context - set default path for all files
  context: path.resolve(__dirname, 'src'), 

  //Mode - set webpack config mode
  mode: 'development',

  //Entry - set entry files names
  entry: {
    main: ['@babel/polyfill', './index.js'],
    analytics: './analytics.js'
  },

  //Output - set output files names and path
  output: {
    filename: fileName('js'),
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
  optimization: optimization(),

  //devServer - set configuration for dev server
  devServer: {
    port: 4200,
    hot: true
  },

  //Plugins - set diff plagins for webpack
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{
        from: path.resolve(__dirname, 'src/favicon.ico'),
        to: path.resolve(__dirname, 'dist')
      }]
    }),
    new MiniCssExtractPlugin({
      filename: fileName('css')
    })
  ].concat(generateHtmlPlugins('./src/views')),
  
  // ADD modules - use for diff files load in js files
  module: {
    rules: [
      { test: /\.css$/, use: cssLoaders() },
      { test: /\.s[ca]ss$/, use: cssLoaders('sass-loader') },
      { test: /\.(png|jpeg|jpg|gif|svg)$/, use: ['file-loader'] },
      { test: /\.(ttf|woff|woff2|eot)$/, use: ['file-loader'] },
      { test: /\.xml$/, use: ['xml-loader'] }, 
      { test: /\.scv$/, use: ['scv-loader'] },
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: {
          loader: 'babel-loader', 
          options: {
            presets: [
              '@babel/preset-env', 
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ]
          }
        } 
      },
      { 
        test: /\.ts$/, 
        exclude: /node_modules/, 
        loader: {
          loader: 'babel-loader', 
          options: {
            presets: [
              '@babel/preset-env', 
              '@babel/preset-typescript'
            ],
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ]
          }
        } 
      }
    ]
  }
}