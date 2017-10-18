const cmd = require('../shared/cmd');

// Tasks
const webpackRun = require('../webpack/webpack-run');
const jestStart = require('../jest/jest-start');
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
	}
};
