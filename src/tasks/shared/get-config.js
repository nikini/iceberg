const shell = require('shelljs');
const path = require('path');
const cmd = require('./cmd');

/**
 * Tries to get the .snowConfig configuration or fails
 *
 * @return {Object}
 */
module.exports = () => {
	const configuration = shell.cat(path.join(process.cwd(), '.snowConfig.json'));
	if (!configuration.toString()) {
		cmd.error('Could not find ".snowConfig" configuration file');
		cmd.log('You could generate it using `pasnow make -t config`');
		throw new Error('Could not find ".snowConfig" configuration file');
	}
	const parsedConfig = JSON.parse(configuration.toString());

	if (!parsedConfig.v2) {
		cmd.error('The configuration file ".snowConfig" seems invalid');
		throw new Error('The configuration file ".snowConfig" seems invalid');
	}
	return parsedConfig.v2;
};
