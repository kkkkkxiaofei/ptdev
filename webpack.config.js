const path = require('path')
const source = [path.resolve(__dirname, 'src/')]
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, 'build', 'static'),
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                include: source,
                presets: ['es2015','react']

            },
            { 
                test: /\.(css|scss|sass)$/i, 
                loaders: ['style', 'css', 'sass'] 
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
        title: 'Dashboard',
        template: path.resolve(__dirname, 'index.html'),
        filename: '../index.html'
      })
    ]
};