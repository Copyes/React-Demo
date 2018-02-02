const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [{ loader: 'babel-loader' }]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        use: [{ loader: 'style-loader!css-loader!less-loader' }]
      }
    ]
  }
}
