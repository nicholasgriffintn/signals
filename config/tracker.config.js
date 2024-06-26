const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, '../tracker.js'),
  output: {
    path: path.resolve(__dirname, '../public'),
    filename: 'sat.js',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
