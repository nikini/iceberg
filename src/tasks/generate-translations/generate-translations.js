const cmd = require('../shared/cmd');
const webpackRun = require('../webpack/webpack-run');
const getConfig = require('../shared/get-config');
const copyPath = require('../copy/copy-path');
const getPlugins = require('../../plugins/get-plugins');

/**
 * Builds the final file (for production)
 *
 * @param  {Object}   options
 * @param  {Object}   callback
 */
module.exports = (options = {}, callback) => {
	const configuration = getConfig();
	const translationOptions = {
		single: true,
		production: true,
		split: true,
		translations: true,
	};

	// Let's get all the plugins
	const plugins = getPlugins();
	const message = 'Succesfully wrote the translations';

	if (configuration.translations)
		webpackRun(translationOptions, (error) => {
			if (!error)
				if ((!options.exclude || options.exclude.indexOf('copy') < 0) && plugins.copy)
					// Copy to target
					copyPath(configuration.outputPath, plugins.copy.config.destination, plugins.copy.config.source, options.silent, () => {
						// Log output
						cmd.success(message);

						if (callback)
							callback();
					});
				else {
					cmd.success(message);

					if (callback)
						callback();
				}
		});
	else
		callback();
};
