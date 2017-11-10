const path = require('path');

module.exports = {
  entry: './src/modules/presentation.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};