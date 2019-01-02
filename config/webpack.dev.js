var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var path = require('path');

module.exports = webpackMerge(commonConfig, {
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules:[
            { test: /\.ts$/, loaders:['@ngtools/webpack'], exclude: /node_modules/ }
        ]
    },

    output:{
        path: helpers.root('dist'),
        publicPath: '/app',
        filename: 'main.js'
    },

    plugins: [
        new AngularCompilerPlugin({
            tsConfigPath: './tsconfig.json',
            entryModule: 'src/app/app.module#AppModule'
        }),
        new ExtractTextPlugin('[name].css')
    ],

    devServer:{
        historyApiFallback: true,
        stats: 'minimal',
        disableHostCheck: true
    }
});