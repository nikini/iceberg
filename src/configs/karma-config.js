const webpackConfig = require('./webpack-config.js');
const getConfig = require('../tasks/shared/get-config');
const path = require('path');
const config = require('karma').config;

/**
 * Function that spits out the karma config
 *
 * @param  {Boolean} [single=false]
 *
 * @return {Object}
 */
module.exports = (single = false) => {
	const configuration = getConfig();
	const modulePath = path.resolve(configuration.modulePath);
	const filesPath = path.join(modulePath, '**/*-spec.js');
	const karmaFiles = configuration.extraKarmaFiles;

	const preprocessors = {};
	preprocessors[filesPath] = ['webpack'];

	karmaFiles.push(filesPath);

	return {
		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: modulePath,

		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['jasmine'],

		// list of files / patterns to load in the browser
		files: karmaFiles,

		// list of files to exclude
		exclude: [
		],

		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors,

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['mocha'],

		// web server port
		port: 9876,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,

		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['Chrome_without_security'],

		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: single,

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency: Infinity,

		customLaunchers: {
			Chrome_without_security: {
				base: 'Chrome',
				flags: ['--disable-web-security'],
			},
		},

		webpack: webpackConfig(),
	};
};
