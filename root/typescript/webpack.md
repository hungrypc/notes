# Using Webpack with TypeScript

> Webpack is a bundling and 'build orchestration' tool

It's a tool that helps us reduce the amount of http requests by bundling code together so that we can write code split across multiple files but have webpack bundle them together. This optimizes our code and allows us to add more build steps/tools.

```cli
npm i --save-dev webpack webpack-cli webpack-dev-server typescript ts-loader
```

```js
// .tsconfig
{
    // ...
    // "rootdir": "./src"  // comment this out
    // ...
}

// create in root: webpack.config.js
const path = require('path')

module.exports = {
  entry: "./src/app.ts",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,     // tells webpack to check for files that end in .ts
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']      // tells webpack to bundle all files with these extensions
  }
};


// remove all .js extensions in all imports


// package.json
{
  // ...
  "scripts": {
    // ...
    "build": "webpack"
  },
  // ...
}
```

```html
<script type="module" src="dist/bundle.js"></script>
```

## Finishing Setup and Using webpack-dev-server

```js
// package.json
{
  // ...
  "scripts": {
    // ...
    "start": "webpack-dev-server"
  },
  // ...
}

// webpack.config.js
module.exports = {
  mode: 'development',
  // ...
  output: {
    // ...
    publicPath: 'dist'
  },
  // ...
};
```
So now, whenever we make changes to our ts files, webpack recompiles on the go. Very useful for development

## Production Workflow
```js
// create webpack.prod.js
// npm i --save-dev webpack-clean-plugin
const path = require('path')
const CleanPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: "./src/app.ts",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'none',
  module: {
    rules: [
      {
        test: /\.ts$/, 
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'] 
  },
  plugins: [
    new CleanPlugin.CleanWebpackPlugin()
  ]
};

// package.json
{
    "scripts": {
        // ...
        "build": "webpack --config webpack.prod.js"
    },
}
```
