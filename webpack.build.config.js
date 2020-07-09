const webpack = require('webpack');
const path = require('path');
const BabiliPlugin = require('babili-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { spawn } = require('child_process');

module.exports = (env, argv) => {
  const CSSExtract = new ExtractTextPlugin('styles.css');

  return {
    entry: ['@babel/polyfill', './src/app.js'],
    devtool: false,
    stats: {
      colors: true,
      chunks: false,
      children: false,
      modules: false,
    },
    target: 'electron-renderer',
    plugins: [
      CSSExtract,
      new CleanWebpackPlugin({ cleanStaleWebpackAssets: true }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
    ],
    optimization: {
      minimize: true,
      minimizer: [
        new UglifyJsPlugin({
          include: /\.min\.js$/,
        }),
      ],
    },
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.(jsx|js)$/,
          exclude: /node_modules/,
        },
        {
          test: /\.(sa|sc|c)ss$/,
          use: CSSExtract.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  importLoaders: 1,
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true,
                },
              },
            ],
          }),
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'img/',
                publicPath: 'img/',
              },
            },
          ],
        },
        // {
        //   test: /\.(jpeg|jpg|png|gif)$/,
        //   use: [
        //     { loader: 'file-loader?name=img/[name]__[hash:base64:5].[ext]' },
        //   ],
        // },
        // {
        //   test: /\.(eot|svg|ttf|woff|woff2)$/,
        //   use: [
        //     { loader: 'file-loader?name=font/[name]__[hash:base64:5].[ext]' },
        //   ],
        // },
      ],
    },
  };
};
