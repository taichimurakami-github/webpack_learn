const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',//remove the states "--mode=development"
    devtool: 'source-map',
    entry: './src/javascripts/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'javascripts/main.js',//頭に"./"を付けるとコンパイルエラーになる
    },
    module:{
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', { 'targets': '>30%, not dead' }],
                                '@babel/preset-react'
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.(css|sass|scss)/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,//second applied
                    },
                    {
                        loader: 'css-loader',//first applyied(use: apply from bottomside to upperside)
                        options: {
                            sourceMap: true,//can be too heavy if the file is large
                        },
                    },
                    {
                        loader: 'sass-loader',
                    },
                ],
            },
            {
                test: /\.(png|jpg)/,//images settings
                type: 'asset/resource',
                generator: {// for official function-------------
                    filename: 'images/[name][ext]'
                },
                use: [
                    // {  for file-loader--------------
                    //     loader: 'file-loader',
                    //     options: {
                    //         esModule: false,
                    //         name: 'images/[name].[ext]',
                    //     },
                    // },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65
                            }
                        }
                    }
                ],
            },
            {
                test: /\.pug/,
                use: [
                    {
                        loader: 'html-loader',//load secondally
                    },
                    {
                        loader: 'pug-html-loader',//load at first
                        options: {
                            pretty: true,// Insert line break at the end of the line
                        }
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './stylesheets/main.css',
        }),
        new HtmlWebpackPlugin({
            template: './src/templates/index.pug',//add content to auto-made html in dist
            filename: 'index.html',
        }),
        new HtmlWebpackPlugin({
            template: './src/templates/access.pug',//add content to auto-made html in dist
            filename: 'access.html',
        }),
        new HtmlWebpackPlugin({
            template: './src/templates/members/taro.pug',//add content to auto-made html in dist
            filename: 'members/taro.html',//cannot open if "/members/taro.html"
        }),
        new CleanWebpackPlugin(),
    ],
}
