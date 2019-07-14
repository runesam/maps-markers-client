const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

const { API_URL } = process.env;

module.exports = () => merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true,
		host: '0.0.0.0',
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
            API_URL: `'${API_URL}'`,
			'process.env.NODE_ENV': '\'development\'',
		}),
	],
});
