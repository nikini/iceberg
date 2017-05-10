const path = require('path');
const shell = require('shelljs');
const precss = require('precss');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const SassLintPlugin = require('sasslint-webpack-plugin');

const cmd = require('../tasks/shared/cmd');
const getConfig = require('../tasks/shared/get-config');

const excludePath = /(node_modules|bower_components)/;

/**
 * Function that spits out the webpack config
 *
 * @param  {Object} [options={}]
 *
 * @return {Object}
 */
module.exports = (options = {}) => {
	const configuration = getConfig();
	const scssPath = path.resolve(configuration.sassPath);
	const jsPath = configuration.modulePath;
	const entry = path.join(path.resolve(jsPath), configuration.entry);

	const plugins = [
		new SassLintPlugin({
			configFile: '.sass-lint.yml',
			glob: 'src/**/*.s?(a|c)ss',
		}),
	];

	if (options.production)
		plugins.concat(
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('production'),
				},
			}),
			new webpack.LoaderOptionsPlugin({
				minimize: true,
			}),
			new webpack.optimize.UglifyJsPlugin({
				mangle: false,
				compress: {
					warnings: false,
				},
			})
		);

	return {
		name: configuration.name || 'PA',
		devtool: options.production ? undefined : '#cheap-source-map',
		entry: [
			entry,
		],
		output: {
			path: configuration.outputPath,
			filename: configuration.outputName || '[name].bundle.js',
		},
		resolve: {
			modules: [
				jsPath,
				'./node_modules',
			],
			extensions: ['.js'],
		},

		module: {
			rules: [
				{
					enforce: 'pre',
					test: /\.js$/,
					exclude: excludePath,
					loader: 'eslint-loader',
				},
				{
					test: /\.js$/,
					exclude: excludePath,
					use: {
						loader: 'babel-loader',
					},
				},
				{
					enforce: 'pre',
					test: /\.html$/,
					exclude: excludePath,
					loader: 'htmlhint-loader',
				},
				{
					test: /\.html$/,
					loader: `ngtemplate-loader?relativeTo=${jsPath}/!html-loader`,
				},
				{
					test: /\.scss$/,
					exclude: excludePath,
					use: [{
						// creates style nodes from JS strings
						loader: 'style-loader',
					}, {
						// translates CSS into CommonJS
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					}, {
						// Post CSS (for autoprefixer)
						loader: 'postcss-loader',
						options: {
							plugins() {
								return [
									precss,
									autoprefixer({
										browsers: ['last 2 versions', '> 5%', 'ie 9', 'ie 10', 'ie 11'],
									}),
								];
							},
						},
					}, {
						// compiles Sass to CSS
						loader: 'sass-loader',
						options: {
							sourceMap: true,
							includePaths: [scssPath],
						},
					}],
				},
			],
		},

		plugins,
	};
};
