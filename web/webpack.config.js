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
        test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
        exclude: /node_modules/,
        use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
      }
    ],
  },
  resolve: {
    extensions: [".*", ".js", ".jsx", ".css", ".svg"],
  },
  plugins: [htmlPlugin, analyzerPlugin]
};