const cmd = require('../shared/cmd');
const webpackRun = require('../webpack/webpack-run');
const getConfig = require('../shared/get-config');
const copyPath = require('../copy/copy-path');

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

	if (configuration.translations)
		webpackRun(translationOptions, (error) => {
			if (!error)
				// Copy to target
				copyPath(configuration.outputPath, configuration.destination, configuration.source, options.silent, () => {
					// Log output
					cmd.success('Succesfully wrote the translations');

					if (callback)
						callback();
				});
		});
	else
		callback();
};
