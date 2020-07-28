# How to set webpack? 

## Main steps:
1. npm init;
2. npm install -D webpack webpack-cli; (webpack - корневой пакет технологии; webpack-cli - команды, которые доступны в консоли);
3. npm i -D webpack-dev-server; (install package for creating web server)
4. if problem with webpack command in console -> use npx webpack --config webpack.config.js;
5. Better add in package.json -> scripts ->  
  {
    - "build": "cross-env NODE_ENV=production webpack --mode production",
    - "dev": "cross-env NODE_ENV=development webpack --mode development",
    - "start": "cross-env NODE_ENV=development webpack-dev-server --mode development --open",
    - "watch": "webpack --mode production --watch"
  }
6. npm i -D cross-env -- добавления флага в package.json прод или дев;

## Plugins: 
1. npm i -D html-wepback-plugin -- название файлов в index.html;
2. npm i -D clean-webpack-plugin -- очищает сбилденные файлы;
3. npm i -D copy-webpack-plugin -- копирует нужные файлы с папки в папку; 
4. npm install --save-dev mini-css-extract-plugin -- компилировать файлы со стилями;
5. npm install terser-webpack-plugin --save-dev -- 
6. npm install --save-dev optimize-css-assets-webpack-plugin -- 

## Webpack options
1. context: ... -- set default path for all next steps; 
2. mode: 'development' -- set current mode
3. entry -- for set start file, before webpack build; 
  {
    - chunk-name: path to file
  } 
4. output: 
  {
    - filename: '[name].[contenthash].js', -- set filename after build ([name] - put shunk name in entry, [contenthash] - for correct file name after content change)
    - path: path.resolve(__dirname, 'dist') -- set filepath after buid (path - require from node modules, dist - and directory)
  };
5. plugins: [] -- for set different plugins;
6. resolve: 
  {
    - extensions: ['.js', '.json', 'png', 'svg', ''] -- use for write defaults files formats
    - alias: {
      "@styles": path.resolve(__dirname, 'src/styles') -- create variable path to dir
    }
  }; 
7. optimization: 
  {
    splitChunks: 
    {
      chunks: 'all'
    }
  } -- use for split same libs
8. 

## Loaders: 
1. npm i -D style-loader css-loader -- install loaders for work with css; 
2. module: 
  {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  } -- add to our webpack.config.js for buid css files
3. npm i -D file-loader - for works with files
  {
    - test: /\.(png|jpeg|jpg|gif|svg)$/,
    - use: ['file-loader']
  }
4.  {
      - test: /.(ttf|woff|woff2|eot)$/,
      - use: ['file-loader]
    } -- works with fots inputs
5.  { 
      - test: /\.xml$/,
      - use: ['xml-loader']
    } -- for xml files;
6. {
      - test: /\.scv$/, 
      - use: ['scv-loader']
    } -- use for csv (install [npm i papaparse] before use)