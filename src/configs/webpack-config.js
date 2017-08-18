const fs = require('fs');
const path = require('path');
const precss = require('precss');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const jsonImporter = require('node-sass-json-importer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const colors = require('colors');
const each = require('lodash/each');
const isPlainObject = require('lodash/isPlainObject');
const keys = require('lodash/keys');

const now = require('../tasks/shared/now');
const getConfig = require('../tasks/shared/get-config');
const eslintJson = require('../tasks/make/make-other/template/.eslintrc.json');
const babelConfig = require('./babel-config');

require('babel-polyfill');

/**
 * Function that spits out the webpack config
 *
 * @param  {Object} [options={}]
 * @param  {string} [singleEntryPoint='']
 * @param  {string} [singleExitPoint='']
 *
 * @return {Object}
 */
module.exports = (options = {}, singleEntryPoint = '', singleExitPoint = '') => {
	const configuration = getConfig();

	// Get the exclude path
	let excludePath = /(node_modules|bower_components)/;
	if (configuration.excludePath)
		excludePath = new RegExp(configuration.excludePath.join('|'), 'i');

	const scssPath = path.resolve(configuration.sassPath);
	const jsPath = path.resolve(configuration.modulePath);
	const entry = [path.join(path.resolve(jsPath), singleEntryPoint)];
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

	let plugins = [
		new ProgressBarPlugin({
			clear: false,
			summary: false,
			format: now() + ' Bundling "' + singleExitPoint + '"' + (options.production ? ' (production)' : '') + ' [:bar] ' + colors.green(':percent') + ' (:elapsed seconds)',
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

	if (options.production)
		plugins = plugins.concat([
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('production'),
				},
				ENVIRONMENT: JSON.stringify('production'),
			}),
			new webpack.LoaderOptionsPlugin({
				minimize: true,
			}),
			new webpack.optimize.UglifyJsPlugin({
				mangle: false,
				compress: {
					warnings: false,
				},
			}),
		]);
	else
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
	if (!options.single && options.exclude.indexOf('dev-server') < 0) {
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
			filename: `${singleExitPoint}.css`,
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

	// Where to output
	const output = {
		path: path.resolve(configuration.outputPath),
		chunkFilename: '[name].[id].js',
		filename: `${singleExitPoint}.js`,
	};

	return {
		name: configuration.name || 'PA',
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
		},
		resolveLoader: {
			alias: {
				'custom-sass-lint-loader': path.join(__dirname, '../loaders/sass-lint-loader'),
			},
		},

		module: {
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
					options: babelConfig(options),
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

		devServer: {
			hot: true,
			inline: true,
			compress: true,
			port: devServerPort,
			proxy: devProxy,
			publicPath: configuration.devPath,
			stats: {
				assets: false,
				chunks: false,
				chunkModules: false,
				modules: false,
				colors: true,
			},
		},

		externals: {
			cheerio: 'window',
			'react/addons': 'react',
			'react/lib/ExecutionEnvironment': 'react',
			'react/lib/ReactContext': 'react',
		},
	};
};
