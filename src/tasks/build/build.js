const cmd = require('../shared/cmd');
const webpackRun = require('../webpack/webpack-run');
const getConfig = require('../shared/get-config');
const copyPath = require('../copy/copy-path');
const generateTranslations = require('../generate-translations/generate-translations');

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

	const inTheEnd = (error) => {
		if (!error)
			// Copy to target
			copyPath(configuration.outputPath, configuration.targetPath, configuration.copyPath, options.silent, () => {
				// Log output
				cmd.success('Succesfully built the bundle');
			});
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
