const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin




const htmlPlugin = new HtmlWebpackPlugin({
  template: "public/index.html",
  filename: './index.html',
  favicon: './public/favicon.ico'
})

const analyzerPlugin = new BundleAnalyzerPlugin({
 analyzerMode : "disabled",
 generateStatsFile : "true",
 statsFilename: "../logs/stats.json"
})
/*
const commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: "vendor",
  minChunks: Infinity,
})
*/
module.exports = {
  entry: "./src",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  performance:{
    maxEntrypointSize: 512000, 
    maxAssetSize: 512000
  },
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env', '@babel/react']
            }
        },    
      },
      { 
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ico|webmanifest)$/,
        exclude: /node_modules/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          },
        },
      }
    ],
  },
  resolve: {
    extensions: [".*", ".js", ".jsx", ".css", ".svg"],
  },
  plugins: [htmlPlugin, analyzerPlugin]
};