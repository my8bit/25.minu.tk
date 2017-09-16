const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SplitByPathPlugin = require('webpack-split-by-path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const OfflinePlugin = require('offline-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  module: {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /.json$/,
        loaders: [
          'json'
        ]
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file?name=fonts/[name].[ext]'
      },
      {
        test: /\.(css|scss)$/,
        loaders: ExtractTextPlugin.extract('style', 'css!sass!resolve-url!sass?sourceMap', 'postcss')
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'babel'
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new CopyWebpackPlugin([{from: path.resolve(__dirname, '../src/_redirects')}, {from: path.resolve(__dirname, '../node_modules/roboto-fontface')}]),
    new HtmlWebpackPlugin({
      template: conf.path.src('index.html'),
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        removeComments: true,
        removeEmptyAttributes: true
      },
      inject: true
    }),
    new webpack.DefinePlugin({
      FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY),
      FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
      FIREBASE_DATABASE_URL: JSON.stringify(process.env.FIREBASE_DATABASE_URL),
      FIREBASE_PROJECT_ID: JSON.stringify(process.env.FIREBASE_PROJECT_ID),
      FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
      FIREBASE_MESSEGING_SENDER_ID: JSON.stringify(process.env.FIREBASE_MESSEGING_SENDER_ID),
      IFTT_KEY: JSON.stringify(process.env.IFTT_KEY),
      TRIGGER_NAME: JSON.stringify(process.env.TRIGGER_NAME)
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true// eslint-disable-line camelcase
      }
    }),
    new SplitByPathPlugin([{
      name: 'vendor',
      path: path.join(__dirname, '../node_modules')
    }]),
    new ExtractTextPlugin('/index-[contenthash].css'),
    new OfflinePlugin({
      excludes: ['_redirects']
    })
  ],
  postcss: () => [autoprefixer],
  resolve: {
    alias: {
      config: path.resolve(__dirname, `../${conf.path.src('config.json')}`)
    }
  },
  output: {
    path: path.join(process.cwd(), conf.paths.dist),
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js'
  },
  entry: {
    app: `./${conf.path.src('index.jsx')}`
  }
};
