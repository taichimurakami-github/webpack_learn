const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
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
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html',//add content to auto-made html in dist
        }),
    ],
}
