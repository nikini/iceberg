const path = require('path');
const shell = require('shelljs');
const TranslationsPlugin = require('../webpack-plugins/translations-plugin');

const webpackConfig = require('./webpack-config');
const getConfig = require('../tasks/shared/get-config');

/**
 * Function that spits out the webpack config to generate a translate
 *
 * @param  {Object} [options={}]
 * @param  {string} [singleOptions={}]
 *
 * @return {Object}
 */
module.exports = (options = {}, singleOptions = {}) => {
	if (!options.bundleAction)
		options.bundleAction = 'I18ning';

	const decentWebpackConfig = webpackConfig(options, singleOptions);
	const config = Object.assign({}, decentWebpackConfig);

	// Get the translations file
	const configuration = getConfig();
	const jsPath = path.resolve(configuration.modulePath);
	const translationsFile = path.join(jsPath, configuration.translations.file);

	// Get the exclude path
	let excludePath = /(node_modules|bower_components)/;
	if (configuration.excludePath)
		excludePath = new RegExp(configuration.excludePath.join('|'), 'i');

	// If file does not exist, create it
	if (!shell.test('-e', translationsFile))
		shell.ShellString('[]').to(translationsFile);

	config.plugins.push(new TranslationsPlugin({
		translationsFile,
	}));

	// Add the loader
	if (!config.resolveLoader)
		config.resolveLoader = {};

	if (!config.resolveLoader.alias)
		config.resolveLoader.alias = {};

	config.resolveLoader.alias['custom-translations-loader'] = path.join(__dirname, '../webpack-loaders/translations-loader');

	// Add the loader rule
	if (!config.module)
		config.module = {};

	if (!config.module.rules)
		config.module.rules = [];

	config.module.rules.unshift({
		enforce: 'pre',
		test: /(\.js|\.jsx)$/,
		exclude: excludePath,
		loader: 'custom-translations-loader',
		options: {
			regexp: configuration.translations.regexp,
			file: translationsFile,
		},
	});

	// Set the stats to nothing
	config.stats = 'none';

	return config;
};
