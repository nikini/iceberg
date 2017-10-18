const Gaze = require('gaze').Gaze;
const cmd = require('../shared/cmd');
const each = require('lodash/each');

// Tasks
const webpackRun = require('../webpack/webpack-run');
const jestStart = require('../jest/jest-start');
const getConfig = require('../shared/get-config');
const getPlugins = require('../../plugins/get-plugins');

/**
 * Watch the files
 *
 * @param  {Object}   options
 * @param  {Function} onChange
 */
module.exports = (options = {}) => {
	const configuration = getConfig();

	// Default values
	options.host = options.host || 'localhost';
	options.port = options.port || 8080;

	cmd.log('Starting watch' + (options.production ? ' (production)' : ''));

	// Start the webpack watch
	if (options.exclude.indexOf('webpack') < 0)
		webpackRun(options);

	// Start the jest server
	if (options.exclude.indexOf('jest') < 0) {
		const jestStartOptions = Object.assign({}, options, {
			hideFullCoverage: true,
		});
		jestStart(jestStartOptions);
	}

	const gaze = new Gaze(configuration.watchPaths);
	gaze.on('ready', () => {
		cmd.log('Started watching files for changes');
	});

	// First get all the plugins
	const plugins = getPlugins();

	// On changed / added / deleted
	gaze.on('all', (eventType, filepath) => {
		const extension = filepath.split('.').pop();

		each(plugins, (plugin) => {
			if (typeof plugin.single === 'function' && options.exclude.indexOf(plugin.name) < 0)
				plugin.single({
					filepath,
					extension,
				}, options, plugin.config);
		});
	});
};
