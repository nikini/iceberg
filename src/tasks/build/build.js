const cmd = require('../shared/cmd');
const webpackWatch = require('../watch/webpack-watch');

/**
 * Builds the final file (for production)
 *
 * @param  {Object}   options
 */
module.exports = (options = {}) => {
	webpackWatch({
		single: true,
		production: true,
	});
};
