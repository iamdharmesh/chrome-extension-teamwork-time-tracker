const defaultConfig = require('10up-toolkit/config/webpack.config');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
	...defaultConfig,
	plugins: [
		...defaultConfig.plugins.filter(
			(plugin) => plugin.constructor.name !== 'DependencyExtractionWebpackPlugin',
		),
		new CopyPlugin({
			patterns: [
				{
					from: 'src/images/*',
					to: 'images/[name][ext]',
				},
				{
					from: 'src/*',
					to: '[name][ext]',
				},
			],
		}),
	],
};
