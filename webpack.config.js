const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: isProd ? './src/entry.ts' : './src/dev.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    port: 9090,
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body',
      template: 'public/index.html',
    }),
  ],
  output: {
    filename: 'timer.min.js',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, './dist'),
  },
};
