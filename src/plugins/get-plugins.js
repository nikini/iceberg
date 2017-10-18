const each = require('lodash/each');
const getConfig = require('../tasks/shared/get-config');

const copyResources = require('./copy-resources/copy-resources');
const clearCache = require('./clear-cache/clear-cache');

module.exports = () => {
	const configuration = getConfig();
	const plugins = {};

	each(configuration.plugins, (pluginConfiguration, pluginName) => {
		let single;
		if (pluginName === 'copy')
			single = copyResources.single;

		if (pluginName === 'cache')
			single = clearCache.single;

		plugins[pluginName] = {
			name: pluginName,
			single,
			config: pluginConfiguration,
		};
	});

	return plugins;
};
