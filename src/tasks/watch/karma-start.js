const path = require('path');
const cmd = require('../shared/cmd');
const KarmaServer = require('karma').Server;
const karmaConfig = require('../../configs/karma-config.js');

/**
 * Start the karma tests
 *
 * @param  {Object} [options={}]
 */
module.exports = (options = {}) => {
	cmd.log('Starting Karma');

	const config = karmaConfig(options);
	const server = new KarmaServer(config, (exitCode) => {
		if (exitCode > 0)
			cmd.error(`Karma has exited with code ${exitCode}`);
		process.exit(exitCode);
	});
	server.start();
};
