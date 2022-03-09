'use strict';

const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        main: ['babel-polyfill', './src/index.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|json)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.(ts|tsx)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: 'style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    },
                    {
                        loader: 'sass-loader', // compiles Sass to CSS
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|gif|ico|ttf|woff|eot)$/,
                use: [
                    {
                        loader: 'url-loader?limit=25000',
                        //8192
                    },
                ],
            },
            { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff2' } },
            { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff' } },
            { test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'file-loader' },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.config.js', '.web.js', '.scss', '.ts', '.tsx'],
        modules: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'node_modules')],
        alias: { 'dom-helpers': 'dom-helpers5', src: path.resolve(__dirname, 'src/') },
    },
    output: {
        path: __dirname + '/dist/',
        publicPath: '/',
        filename: '[name].min.js',
    },
    devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                PUBLIC_URL: JSON.stringify('http://localhost:8000'),
                DEPLOY_URL: JSON.stringify('https://sweeetheart.herokuapp.com'),
            },
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
        }),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: true,
            }),
        ],
    },
    devServer: {
        hot: true,
        historyApiFallback: true,
        port: 3000,
    },
    performance: {
        hints: false,
    },
};
