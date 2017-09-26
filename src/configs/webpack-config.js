const fs = require('fs');
const path = require('path');
const precss = require('precss');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const jsonImporter = require('node-sass-json-importer');
const colors = require('colors');
const each = require('lodash/each');
const isPlainObject = require('lodash/isPlainObject');
const keys = require('lodash/keys');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VisualizerPlugin = require('webpack-visualizer-plugin');

const now = require('../tasks/shared/now');
const getConfig = require('../tasks/shared/get-config');
const eslintJson = require('../tasks/make/make-other/template/.eslintrc.json');
const babelConfig = require('./babel-config');

/**
 * Function that spits out the webpack config
 *
 * @param  {Object} [options={}]
 * @param  {string} [singleOptions={}]
 *
 * @return {Object}
 */
module.exports = (options = {}, singleOptions = {}) => {
	const configuration = getConfig();

	// Get the exclude path
	let excludePath = /(node_modules|bower_components)/;
	if (configuration.excludePath)
		excludePath = new RegExp(configuration.excludePath.join('|'), 'i');

	const scssPath = path.resolve(configuration.sassPath);
	const jsPath = path.resolve(configuration.modulePath);
	const entry = [path.join(path.resolve(jsPath), singleOptions.entry)];
	const nodeModulesPath = path.join(process.cwd(), 'node_modules');
	const packageNodeModulesPath = path.join(__dirname, '../../node_modules');

	const devServerPort = options.devPort || 9090;

	const devProxy = configuration.devProxy || {};
	each(devProxy, (value, key) => {
		let newValue = value;
		newValue = newValue.replace('{port}', options.port);
		newValue = newValue.replace('{host}', options.host);
		devProxy[key] = newValue;
	});

	const bundleAction = options.bundleAction || 'Bundling';

	let plugins = [
		new ProgressBarPlugin({
			clear: false,
			summary: false,
			format: now() + ' ' + bundleAction + ' "' + singleOptions.exit + '"' + (options.production ? ' (production)' : '') + ' [:bar] ' + colors.green(':percent') + ' (:elapsed seconds)',
		}),
	];

	const cssLoaders = [{
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
			sourceMap: true,
		},
	}];

	const scssLoaders = cssLoaders.concat([{
		// compiles Sass to CSS
		loader: 'sass-loader',
		options: {
			sourceMap: true,
			importer: [jsonImporter],
			includePaths: [scssPath, jsPath],
		},
	}]);

	if (options.production) {
		process.env.NODE_ENV = 'production';
		process.env.BABEL_ENV = 'production';

		plugins = plugins.concat([
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production'),
				'process.env.BABEL_ENV': JSON.stringify('production'),
				ENVIRONMENT: JSON.stringify('production'),
				PRODUCTION: JSON.stringify(true),
			}),
			new webpack.optimize.AggressiveMergingPlugin(),
			new webpack.optimize.OccurrenceOrderPlugin(),
			new webpack.LoaderOptionsPlugin({
				minimize: true,
			}),
			new webpack.optimize.UglifyJsPlugin({
				parallel: true,
				sourceMap: false,
				uglifyOptions: {
					ie8: false,
					compress: {
						warnings: true,
						comparisons: false,
					},
					output: {
						comments: false,
						ascii_only: true,
					},
					ecma: 5,
				},
			}),
		]);
	} else
		plugins.push(new webpack.DefinePlugin({
			ENVIRONMENT: JSON.stringify('development'),
		}));

	// Add the eslint path to the config and make the globals an array (for some
	// reason eslint for node doesn't allow for an object)
	eslintJson.eslintPath = path.join(packageNodeModulesPath, 'eslint');
	if (!fs.existsSync(eslintJson.eslintPath))
		eslintJson.eslintPath = path.join(nodeModulesPath, 'eslint');
	if (!fs.existsSync(eslintJson.eslintPath))
		delete eslintJson.eslintPath;

	if (isPlainObject(eslintJson.globals))
		eslintJson.globals = keys(eslintJson.globals);

	// For dev server
	if (!options.single && !options.production && options.exclude.indexOf('dev-server') < 0) {
		entry.unshift(`webpack-dev-server/client?http://localhost:${devServerPort}`);
		entry.unshift('webpack/hot/dev-server');
		const hmrPlugin = new webpack.HotModuleReplacementPlugin();
		plugins.push(hmrPlugin);
		const namedModulesPlugin = new webpack.NamedModulesPlugin();
		plugins.push(namedModulesPlugin);
	}

	// Output extracted CSS to a file
	if (options.split) {
		const extractPlugin = new ExtractTextPlugin({
			filename: `${singleOptions.exit}.css`,
		});
		const extractPluginConfig = extractPlugin.extract({
			use: 'css-loader',
			fallback: 'style-loader',
		});
		cssLoaders.unshift(extractPluginConfig[0]);
		scssLoaders.unshift(extractPluginConfig[0]);
		plugins.push(extractPlugin);
	}

	// For the sagas
	entry.unshift('babel-regenerator-runtime');

	// To ignore locales for moment js
	plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

	// To get the filesize data
	plugins.push(new VisualizerPlugin({
		filename: './stats-' + (options.production ? 'prod' : 'dev') + '.html',
	}));

	// Where to output
	const output = {
		path: path.resolve(configuration.outputPath),
		chunkFilename: '[name].[id].js',
		filename: `${singleOptions.exit}.js`,
		publicPath: configuration.devPath,
	};

	const babelOptions = babelConfig(options);

	const webpackConfig = {
		name: `${configuration.name} - ${singleOptions.name}`,
		devtool: options.production ? 'source-map' : 'eval-source-map',
		entry,
		output,
		resolve: {
			modules: [
				jsPath,
				packageNodeModulesPath,
				nodeModulesPath,
			],
			extensions: ['.js', '.jsx'],
			alias: configuration.alias,
		},
		resolveLoader: {
			alias: {
				'custom-sass-lint-loader': path.join(__dirname, '../webpack-loaders/sass-lint-loader'),
			},
		},

		module: {
			strictExportPresence: true,
			wrappedContextRecursive: false,
			rules: [{
				enforce: 'pre',
				test: /(\.json)$/,
				exclude: excludePath,
				loader: 'json-loader',
			}, {
				enforce: 'pre',
				test: /(\.js|\.jsx)$/,
				exclude: excludePath,
				loader: 'eslint-loader',
				options: eslintJson,
			}, {
				test: /(\.js|\.jsx)/,
				exclude: excludePath,
				use: {
					loader: 'babel-loader',
					options: babelOptions,
				},
			}, {
				test: /\.scss$/,
				exclude: excludePath,
				use: scssLoaders,
			}, {
				enforce: 'pre',
				test: /\.scss$/,
				exclude: excludePath,
				use: {
					loader: 'custom-sass-lint-loader',
				},
			}, {
				test: /\.css$/,
				use: cssLoaders,
			}, {
				test: /highcharts\/highstock/,
				use: options.production ? 'null-loader' : 'noop-loader',
			}],
		},

		plugins,

		// Some libraries import Node modules but don't use them in the browser.
		// Tell Webpack to provide empty mocks for them so importing them works.
		node: {
			dgram: 'empty',
			fs: 'empty',
			net: 'empty',
			tls: 'empty',
			child_process: 'empty',
		},

		devServer: {
			hot: true,
			inline: true,
			compress: true,
			port: devServerPort,
			proxy: devProxy,
			stats: {
				assets: false,
				chunks: false,
				chunkModules: false,
				modules: false,
				colors: true,
			},
		},
	};

	return webpackConfig;
};
