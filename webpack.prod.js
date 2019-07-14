const webpack = require('webpack');
const merge = require('webpack-merge');
const WebpackBar = require('webpackbar');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');

const common = require('./webpack.common.js');

const { API_URL } = process.env;

module.exports = () => merge(common, {
	devtool: 'cheap',
	mode: 'production',
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				terserOptions: {
					warnings: false,
					compress: {
						comparisons: false,
					},
					parse: {},
					mangle: true,
					output: {
						comments: false,
						ascii_only: true,
					},
				},
				parallel: true,
				cache: true,
				sourceMap: true,
			}),
		],
		nodeEnv: 'production',
		sideEffects: true,
		concatenateModules: true,
		splitChunks: {
			chunks: 'all',
			minSize: 30000,
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			name: true,
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all',
				},
				main: {
					chunks: 'all',
					minChunks: 2,
					reuseExistingChunk: true,
					enforce: true,
				},
			},
		},
		runtimeChunk: true,
	},
	plugins: [
		new WebpackBar({ name: 'maps-markers' }),
        new webpack.DefinePlugin({ API_URL: `'${API_URL}'` }),
		new CompressionPlugin({
			algorithm: 'gzip',
			test: /\.js$|\.css$|\.html$/,
			threshold: 10240,
			minRatio: 0.8,
		}),
	],
});
