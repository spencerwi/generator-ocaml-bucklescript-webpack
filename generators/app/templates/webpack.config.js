// webpack.config.js
const path = require('path')

module.exports = {
  // Entry file can be a Reason or OCaml file
  entry: './src/main.<%= fileExt %>',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'release')
  },
  module: {
    rules: [
      // Set up Reason and OCaml files to use the loader
      { test: /\.(re|ml)$/, use: 'bs-loader' },
    ]
  },
  resolve: {
    // Add .re and .ml to the list of extensions webpack recognizes
    extensions: ['.re', '.ml', '.js']
  }
}
