module.exports = {
  entry: "./client/index.js",
  output: {
    path: __dirname + '/static/js',
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {  test: /\.js$/,loader: "jsx-loader?harmony" }
    ]
  }
};