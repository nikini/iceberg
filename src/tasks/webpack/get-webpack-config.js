const webpackConfig = require('../../configs/webpack-config');
const webpackTranslateConfig = require('../../configs/webpack-translate-config');
const getConfig = require('../shared/get-config');

const each = require('lodash/each');

/**
 * Function that spits out the webpack configs (if more)
 *
 * @param  {Object} [options={}]
 *
 * @return {Object|Array|boolean}
 */
module.exports = (options = {}) => {
	const result = [];
	const configuration = getConfig();

	// Multiple entries
	each(configuration.entries, (entry) => {
		if (!options.bundle || (options.bundle && options.bundle === entry.exit))
			if (options.translations)
				result.push(webpackTranslateConfig(options, entry));
			else
				result.push(webpackConfig(options, entry));
	});

	if (result.length === 0)
		return false;

	if (result.length === 1)
		return result[0];

	return result;
};
