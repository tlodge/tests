var webpack = require('webpack');
var path = require('path');

console.log(path.join(__dirname, '/js/index.js'));

module.exports = {

  entry: path.join(__dirname, '/js/index.js'),
  
  output: {
    path: path.join(__dirname, '../browser/lib'),
    filename: 'nodelib.js',
    libraryTarget: 'var',
    library: 'ConfigNode'
  },
  externals: {
        // require("jquery") is external and available
        //  on the global var jQuery
        "react": "React",
        //"storelib": "storelib",
  },
  plugins: [new webpack.optimize.UglifyJsPlugin()],
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
