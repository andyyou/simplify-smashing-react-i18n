const path = require('path');
const publicPath = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8050/public/assets';

module.exports = {
  entry: path.resolve(__dirname, 'src/client'),
  output: {
    path: path.resolve(__dirname, 'public/assets'),
    filename: 'bundle.js',
    publicPath,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, /public/],
      },
    ],
  },
  mode: process.env.NODE_ENV !== 'production' ? 'production' : 'development',
  devtool: process.env.NODE_ENV !== 'production' ? 'source-map' : false,
  devServer: {
    headers: { 'Access-Control-Allow-Origin': '*' }
  },
  resolve: {
    extensions: ['.js'],
  },
};
