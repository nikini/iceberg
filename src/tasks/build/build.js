const cmd = require('../shared/cmd');
const webpackRun = require('../webpack/webpack-run');
const getConfig = require('../shared/get-config');
const copyPath = require('../copy/copy-path');

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

	if (options.bundle)
		runOptions.bundle = options.bundle;

	// Builds
	webpackRun(runOptions, (error) => {
		if (!error)
			// Copy to target
			copyPath(configuration.outputPath, configuration.targetPath, configuration.copyPath, options.silent, () => {
				// Log output
				cmd.success('Succesfully built the bundle');
			});
	});
};
