var webpack = require('webpack');

module.exports = {

  entry: './nodes/debug/index.js',
  
  output: {
    path: '/Users/tomlodge/tests/dynamic/browser/lib',
    filename: 'yourlib.js',
    libraryTarget: 'var',
    library: 'mylib'
  },
  externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        "react": "React",
        "configNode":"ConfigNode"
        //"react-dom": "ReactDOM",
        //"utils/ReactDecorators": "configNode"
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'  // fetch API
    }),
  ],
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
    ]
  },
};
