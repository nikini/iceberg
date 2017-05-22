const path = require('path');
const cmd = require('../shared/cmd');
const KarmaServer = require('karma').Server;
const karmaConfig = require('../../configs/karma-config.js');

/**
 * Start the karma tests
 *
 * @param  {Boolean} [single=false]
 */
module.exports = (single = false) => {
	cmd.log('Starting Karma');

	const config = karmaConfig(single);
	const server = new KarmaServer(config, (exitCode) => {
		if (exitCode > 0)
			cmd.error(`Karma has exited with code ${exitCode}`);
		process.exit(exitCode);
	});
	server.start();
};
