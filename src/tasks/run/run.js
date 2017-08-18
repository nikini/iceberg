const cmd = require('../shared/cmd');

// Tasks
const mavenCompile = require('../watch/maven-compile');
const cacheClear = require('../watch/cache-clear');
const webpackRun = require('../webpack/webpack-run');
const jestStart = require('../jest/jest-start');
const flowCheck = require('../watch/flow-check');
const runEslint = require('./run-eslint');
const tasksLister = require('../watch/tasks-lister');

/**
 * Run only one package
 *
 * @param  {Object} options
 */
module.exports = (options = {}) => {
	const runTasks = tasksLister('', 'run');
	if (runTasks.indexOf(options.package) < 0) {
		cmd.error('Package "' + options.package + '" not found');
		return;
	}

	cmd.log('Running "' + options.package + '"');

	switch (options.package) {
	case 'webpack':
		webpackRun({
			single: true,
		});
		break;

	case 'jest':
		jestStart({
			single: true,
		});
		break;

	case 'eslint':
		runEslint({
			fix: options.fix,
		});
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
