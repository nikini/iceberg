const shell = require('shelljs');
const path = require('path');
const cmd = require('./cmd');

/**
 * Tries to get the .iceConfig configuration or fails
 *
 * @return {Object}
 */
module.exports = () => {
	const configuration = shell.cat(path.join(process.cwd(), '.iceConfig.json'));
	if (!configuration.toString()) {
		cmd.error('Could not find ".iceConfig" configuration file');
		cmd.log('You could generate it using `iceberg make -t config`');
		throw new Error('Could not find ".iceConfig" configuration file');
	}
	const parsedConfig = JSON.parse(configuration.toString());

	if (!parsedConfig.v2) {
		cmd.error('The configuration file ".iceConfig" seems invalid');
		throw new Error('The configuration file ".iceConfig" seems invalid');
	}
	return parsedConfig.v2;
};
