const Gaze = require('gaze').Gaze;
const cmd = require('../shared/cmd');
const livereload = require('livereload');
const tasksLister = require('./tasks-lister');

// Tasks
const mavenCompile = require('./maven-compile');
const cacheClear = require('./cache-clear');
const copyFile = require('./copy-file');
const webpackWatch = require('./webpack-watch');
const jestStart = require('../jest/jest-start');
const getConfig = require('../shared/get-config');

/**
 * Watch the files
 *
 * @param  {Object}   options
 * @param  {Function} onChange
 */
module.exports = (options = {}, onChange) => {
	const configuration = getConfig();

	// Default values
	options.host = options.host || 'localhost';
	options.port = options.port || 8080;

	cmd.log('Starting watch');

	// Variable used by livereload later, if needed
	let livereloadServer;

	// File extension for the files that will get copied
	const resourcesExtensions = [
		'js', 'map', 'json', 'html', 'css', 'xml',
		'png', 'jpg', 'jpeg', 'gif', 'svg',
	];

	// Start the livereload
	if (options.exclude.indexOf('livereload') < 0) {
		livereloadServer = livereload.createServer();
		cmd.log('LiveReload started');
	}

	// Start the webpack watch
	if (options.exclude.indexOf('webpack') < 0)
		webpackWatch(options);

	// Start the jest server
	if (options.exclude.indexOf('jest') < 0) {
		const jestStartOptions = Object.assign({}, options, {
			hideFullCoverage: true,
		});
		jestStart(jestStartOptions);
	}

	const gaze = new Gaze(configuration.watchPaths);
	gaze.on('ready', (watcher) => {
		cmd.log('Started watching files for changes');
	});

	// On changed / added / deleted
	gaze.on('all', (eventType, filepath) => {
		const extension = filepath.split('.').pop();

		// Copy the file
		if (options.exclude.indexOf('resources') < 0 && resourcesExtensions.indexOf(extension) >= 0) {
			copyFile(filepath, configuration.targetPath, configuration.copyPath, options.silent);
			if (options.exclude.indexOf('livereload') < 0 && extension !== 'java' && extension !== 'xml')
				// We are excluding java and xml files because they reset
				// the livereload when the cache/maven is done
				livereloadServer.refresh('*');
		}

		// Clear the cache if the changed file is an xml file
		if (options.exclude.indexOf('cache') < 0 && extension === 'xml')
			cacheClear(() => {
				if (options.exclude.indexOf('livereload') < 0)
					livereloadServer.refresh('*');
			}, options.host, options.port, options.silent);

		// Compile if the changed file is a JAVA file
		if (options.exclude.indexOf('maven-compile') < 0 && extension === 'java')
			mavenCompile(() => {
				if (options.exclude.indexOf('livereload') < 0)
					livereloadServer.refresh('*');
			}, options.silent);
	});
};
