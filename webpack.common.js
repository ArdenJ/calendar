const path = require('path')

module.exports = {
  module: {
    rules: [
      {
        exclude: [path.resolve(__dirname, 'node_modules')],
        test: [/\.ts$/, /\.tsx$/, /\.js$/, /\.jsx$/],
        use: 'babel-loader',
      },
      {
        exclude: [path.resolve(__dirname, 'node_modules')],
        test: [/\.ts$/, /\.tsx$/],
        use: 'ts-loader',
      },
    ],
  },
  optimization: {
    // We no not want to minimize our code.
    minimize: false,
  },
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  target: 'node',
}
