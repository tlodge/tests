var webpack = require('webpack');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var path = require('path');

console.log(path.join(__dirname, '/js'));

module.exports = {

  output: {
    filename: '[name].js',
    path: '/Users/tomlodge/tests/dynamic/browser/build',
    publicPath: '/',
  },
  entry: {
    app:  '/Users/tomlodge/tests/dynamic/browser/js/index.js',
    vendor: ['reselect', 'redux', 'redux-promise', 'redux-thunk']
  },
  externals: {
    "react" : "React",
    "react-dom" : "ReactDOM",
  },
  resolve: {
    modules: [
      path.join(__dirname, '/js'),
      'node_modules'
    ],
    extensions: ['.js', '.jsx', '.json', '.scss']
  },

  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'  // fetch API
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
    }),
    new BundleAnalyzerPlugin({
       analyzerMode: 'static'
    }),
  ],
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        include: path.resolve(__dirname, '/js'),
        exclude: /(node_modules|bower_components)/
      },
    ]
  },
};
