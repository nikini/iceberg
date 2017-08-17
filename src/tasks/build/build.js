const cmd = require('../shared/cmd');
const webpackWatch = require('../watch/webpack-watch');
const getConfig = require('../shared/get-config');
const copyPath = require('../copy/copy-path');

/**
 * Builds the final file (for production)
 *
 * @param  {Object}   options
 */
module.exports = (options = {}) => {
	const configuration = getConfig();

	// Builds
	webpackWatch({
		single: true,
		production: true,
		split: true,
	}, (error) => {
		if (!error)
			// Copy to target
			copyPath(configuration.outputPath, configuration.targetPath, configuration.copyPath, options.silent, () => {
				// Log output
				cmd.success('Succesfully built the bundle');
			});
	});
};
