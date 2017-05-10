const Gaze = require('gaze').Gaze;
const cmd = require('../shared/cmd');

// Tasks
const mavenCompile = require('./maven-compile');
const cacheClear = require('./cache-clear');
const copyFile = require('./copy-file');
const webpackWatch = require('./webpack-watch');
const karmaStart = require('./karma-start');

/**
 * Watch the files
 *
 * @param  {Object}   options
 * @param  {Function} onChange
 */
module.exports = (options = {}, onChange) => {
	cmd.log('Starting watch');

	const gaze = new Gaze(options.baseLocation);
	gaze.on('ready', (watcher) => {
		cmd.log('Watch started');
	});

	// File extension for the files that will get copied
	const resourcesExtensions = [
		'js', 'map', 'json', 'html', 'css', 'xml', 'svg',
	];

	// Start the webpack watch
	webpackWatch(options.single);

	// Start the karma server
	karmaStart(options.single);

	// On changed / added / deleted
	gaze.on('all', (eventType, filepath) => {
		const extension = filepath.split('.').pop();

		// Copy the file
		if (options.exclude.indexOf('resources') < 0 && resourcesExtensions.indexOf(extension) >= 0)
			copyFile(filepath, './dest', './');

		// Clear the cache if the changed file is an xml file
		if (options.exclude.indexOf('cache') < 0 && extension === 'xml')
			cacheClear(options.host, options.port);

		// Compile if the changed file is a JAVA file
		if (options.exclude.indexOf('java') < 0 && extension === 'java')
			mavenCompile();
	});
};
