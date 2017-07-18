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
			watch: !options.single,
			verbose: true,
			collectCoverage: true,
			transform: {
				'^.+\\.(js|jsx)': path.resolve(__dirname, 'jest-transform.js'),
			},
			moduleNameMapper: {
				'\\.(css|scss)$': 'identity-obj-proxy',
			},
		},
	};

	jest.runCLI(jestOptions, [jestOptions.config.rootDir]);
};
