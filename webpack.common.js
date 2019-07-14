const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

require('dotenv').config({ path: path.resolve(__dirname, '.env') });

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: ['react-hot-loader/patch', './index.js'],
    output: {
        publicPath: '/',
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
        sourceMapFilename: 'bundle.js.map',
    },
    plugins: [new HtmlWebpackPlugin()],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                exclude: [/node_modules/],
                options: {
                    failOnWarning: false,
                    failOnError: false,
                    fix: false,
                },
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [{ loader: 'babel-loader' }],
            },
        ],
    },
    resolve: { modules: [path.resolve(__dirname, 'src'), 'node_modules'] },
};
