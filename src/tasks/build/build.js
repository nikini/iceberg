const cmd = require('../shared/cmd');
const webpackRun = require('../webpack/webpack-run');
const getConfig = require('../shared/get-config');
const copyPath = require('../copy/copy-path');
const generateTranslations = require('../generate-translations/generate-translations');
const getPlugins = require('../../plugins/get-plugins');

/**
 * Builds the final file (for production)
 *
 * @param  {Object}   options
 */
module.exports = (options = {}) => {
	const configuration = getConfig();
	const runOptions = {
		single: true,
		production: true,
		split: true,
	};

	// Let's get all the plugins
	const plugins = getPlugins();

	const inTheEnd = (error) => {
		const message = 'Succesfully built the bundle';
		if (!error)
			if ((!options.exclude || options.exclude.indexOf('copy') < 0) && plugins.copy)
				// Copy to target
				copyPath(configuration.outputPath, plugins.copy.config.destination, plugins.copy.config.source, options.silent, () => {
					// Log output
					cmd.success(message);
				});
			else
				cmd.success(message);
	};

	if (options.bundle) {
		runOptions.bundle = options.bundle;

		// Build the bundle only (if a bundle is specified)
		webpackRun(runOptions, inTheEnd);
	} else
		// Get the translations first
		generateTranslations(options, () => {
			// Build the bundle
			webpackRun(runOptions, inTheEnd);
		});
};
