const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options:{
            presets: ['react', 'es2015', 'stage-1']
          }
        }
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test:/\.(jpg|png)$/,
        use: [
          {
            loader: 'file-loader',
            options:{
              name:'[name].[ext]',
              outputPath: 'images/',
              //publicPath: './src/'
            }
          }
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'src/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    //new webpack.optimize.UglifyJsPlugin()
  ]
};
