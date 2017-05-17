const cmd = require('../shared/cmd');

// Tasks
const mavenCompile = require('../watch/maven-compile');
const cacheClear = require('../watch/cache-clear');
const webpackWatch = require('../watch/webpack-watch');
const karmaStart = require('../watch/karma-start');
const flowCheck = require('../watch/flow-check');

/**
 * Run only one package
 *
 * @param  {Object} options
 */
module.exports = (options = {}) => {
	cmd.log('Running ' + options.package);

	switch (options.package) {
	case 'webpack':
		webpackWatch({
			single: true,
		});
		break;

	case 'karma':
		karmaStart(true);
		break;

	case 'cache':
		cacheClear(false, options.host, options.port, options.silent);
		break;

	case 'maven-compile':
		mavenCompile(false, options.silent);
		break;

	case 'flow-check':
		flowCheck();
		break;
	}
};
