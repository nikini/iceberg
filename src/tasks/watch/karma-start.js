const path = require('path');
const KarmaServer = require('karma').Server;

/**
 * Start the karma tests
 *
 * @param  {Boolean} [single=false]
 */
module.exports = (single = false) => {
	new KarmaServer({
		configFile: path.join(__dirname, '../../configs/karma-config.js'),
		singleRun: single,
	}).start();
};
