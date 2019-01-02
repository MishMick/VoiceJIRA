var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

var appConfig = require('./app.conf.json');

const defineAppConfiguration = {
    'process.env':{
        'envConfig': JSON.stringify(appConfig.environments[process.env.NODE_ENV])
    }
};

module.exports = {
    entry: [
        './src/polyfills.ts',
        './src/vendor.ts',
        './src/main.ts'
    ],

    resolve:{
        extensions:['.ts','.js','.json','.css','.scss','.html']
    },

    module:{
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\. (png | jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.css$/,
                exclude: helpers.root('src','app'),
                loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?sourceMap'})
            },
            {
                test: /\.css$/,
                include: helpers.root('src','app'),
                loader: 'raw-loader'
            }
        ]
    },

    externals: {
        utils:'utils'
    },

    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('./src'),
            {}
        ),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html'
        }),
        new webpack.DefinePlugin(defineAppConfiguration),
        new webpack.ProvidePlugin({
            jquery: 'jquery',
            $ : 'jquery',
            jquery: 'jquery'
        })
    ]
}