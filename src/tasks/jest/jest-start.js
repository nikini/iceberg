const { Gaze } = require('gaze');
const cmd = require('../shared/cmd');
const jest = require('jest-cli');
const path = require('path');
const getConfig = require('../shared/get-config');

/**
 * Start the jest tests
 *
 * @param  {Object} [options={}]
 */
module.exports = (options = {}) => {
	if (options.exclude && options.exclude.indexOf('webpack') < 0)
		// This is because of a bug caused by the ProgressBarWebpackPlugin
		console.log('');

	cmd.log('Starting Jest');

	const configuration = getConfig();
	const modulePath = path.resolve(configuration.modulePath);

	const jestOptions = {
		config: {
			rootDir: modulePath,
			moduleDirectories: [
				'node_modules',
				path.resolve(__dirname, '../../../node_modules'),
				modulePath,
			],
			moduleFileExtensions: [
				'js',
				'jsx',
			],
			watch: false,
			verbose: true,
			collectCoverage: Boolean(configuration.tests.coverageCollection),
			collectCoverageFrom: options.hideFullCoverage ? false : configuration.tests.coverageCollection,
			setupFiles: [
				path.resolve(__dirname, 'jest-shim'),
				path.resolve(__dirname, 'jest-setup'),
			],
			transform: {
				'^.+\\.(js|jsx)?$': path.resolve(__dirname, 'jest-transform.js'),
			},
			moduleNameMapper: {
				'\\.(css|scss)$': 'identity-obj-proxy',
			},
			coverageThreshold: {
				global: configuration.tests.minimumCoverage || {},
			},
			coverageReporters: ['text'],
		},
	};

	if (!jestOptions.config.collectCoverageFrom)
		delete jestOptions.config.collectCoverageFrom;

	jest.runCLI(jestOptions, [jestOptions.config.rootDir]);

	if (configuration.tests.watchPaths && configuration.tests.watchPaths.length && !options.single) {
		const gaze = new Gaze(configuration.tests.watchPaths);
		gaze.on('ready', () => {
			cmd.log('Started watching test files for changes');
		});

		// On changed / added / deleted
		gaze.on('all', (eventType, filepath) => {
			// Only rerun for test files
			if (/\.spec\.(js|jsx)$/.test(filepath))
				jest.runCLI(jestOptions, [jestOptions.config.rootDir]);
		});
	}
};
