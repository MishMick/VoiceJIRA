var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webapck = require('webpack');
var commonConfig = require('./webpack.common.js');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var helpers = require('./helpers');
var path = require('path');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
module.exports = webpackMerge(commonConfig, {
    mode: 'production',
    module:{
        rules:[
            {test: /\.ts$/, loaders: ['@ngtools/webpack'], exclude: /node_modules/}
        ]
    },
    output:{
        path: helpers.root('dist'),
        publicPath: '/app',
        filename: 'main.js'
    },
    plugins:[
        new AngularCompilerPlugin({
            tsConfigPath: './tsconfig.json',
            entryModule: 'src/app/app.module#AppModule' //BASE MODULE
        }),
        new UglifyJSPlugin({
            parallel: true,
            uglifyOptions: {
                warnings: true,
                mangle: true,
                output: {
                    comments: false,
                    beautify: false
                }
            }
        }),
        new ExtractTextPlugin('[name].css'),
        new OptimizeCssAssetsPlugin()
    ],
    devServer:{
        historyApiFallback: true,
        stats:'minimal'
    }
})