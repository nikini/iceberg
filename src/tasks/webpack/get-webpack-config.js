const webpackConfig = require('../../configs/webpack-config');
const getConfig = require('../shared/get-config');

const each = require('lodash/each');

/**
 * Function that spits out the webpack configs (if more)
 *
 * @param  {Object} [options={}]
 *
 * @return {Object}x
 */
module.exports = (options = {}) => {
	const result = [];
	const configuration = getConfig();

	// Multiple entries
	each(configuration.entries, (exit, entry) => {
		result.push(webpackConfig(options, entry, exit));
	});

	return result;
};
