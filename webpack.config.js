const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/javascripts/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'javascripts/main.js',//頭に"./"を付けるとコンパイルエラーになる
    },
    module:{
        rules: [
            {
                test: /\.css/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,//second applied
                    },
                    {
                        loader: 'css-loader',//first applyied(use: apply from bottomside to upperside)
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
            template: './src/templates/index.html',//add content to auto-made html in dist
        }),
        new CleanWebpackPlugin(),
    ],
}
