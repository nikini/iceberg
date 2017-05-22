const path = require('path');
const shell = require('shelljs');
const precss = require('precss');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const jsonImporter = require('node-sass-json-importer');
const SassLintPlugin = require('sasslint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const cmd = require('../tasks/shared/cmd');
const getConfig = require('../tasks/shared/get-config');
const eslintJson = require('../tasks/make/make-other/template/.eslintrc.json');

/**
 * Function that spits out the webpack config
 *
 * @param  {Object} [options={}]
 *
 * @return {Object}
 */
module.exports = (options = {}) => {
	const excludePath = /(node_modules|bower_components)/;
	const configuration = getConfig();
	const scssPath = path.resolve(configuration.sassPath);
	const jsPath = path.resolve(configuration.modulePath);
	const entry = path.join(path.resolve(jsPath), configuration.entry);
	const nodeModulesPath = path.join(process.cwd(), 'node_modules');

	const outputPath = path.resolve(configuration.outputPath);
	const outputName = configuration.outputName || '[name].bundle';

	// Output extracted CSS to a file
	const extractPlugin = new ExtractTextPlugin({
		filename: `${outputName}.css`,
	});
	const extractPluginConfig = extractPlugin.extract({
		use: 'css-loader',
		fallback: 'style-loader',
	});

	const plugins = [
		new SassLintPlugin({
			configFile: '.sass-lint.yml',
			glob: `${scssPath}/**/*.s?(a|c)ss`,
		}),
		extractPlugin,
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
		devtool: options.production ? undefined : '#cheap-module-source-map',
		entry: [
			entry,
		],
		output: {
			path: outputPath,
			filename: `${outputName}.js`,
		},
		resolve: {
			modules: [
				jsPath,
				nodeModulesPath,
			],
			extensions: ['.js'],
		},

		module: {
			rules: [{
				enforce: 'pre',
				test: /\.js$/,
				exclude: excludePath,
				loader: 'eslint-loader',
				options: eslintJson,
			}, {
				test: /\.js$/,
				exclude: excludePath,
				use: {
					loader: 'babel-loader',
				},
			}, {
				enforce: 'pre',
				test: /\.html$/,
				exclude: excludePath,
				loader: 'htmlhint-loader',
			}, {
				test: /\.html$/,
				loader: `ngtemplate-loader?relativeTo=${jsPath}/!html-loader`,
			}, {
				test: /\.scss$/,
				exclude: excludePath,
				use: [extractPluginConfig[0], {
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
						importer: [jsonImporter],
						includePaths: [scssPath, jsPath],
					},
				}],
			}],
		},

		plugins,
	};
};
