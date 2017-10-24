const cmd = require('../shared/cmd');
const CLIEngine = require('eslint').CLIEngine;

const getConfig = require('../shared/get-config');
const eslintJson = require('../make/make-application/template/.eslintrc.json');

/**
 * Run eslint only once
 *
 * @param  {Object}   options
 */
module.exports = (options = {}) => {
	cmd.log('Linting your files');

	const configuration = getConfig();
	const eslintConfig = {
		baseConfig: eslintJson,
		useEslintrc: false,
		fix: options.fix,
		ignorePattern: [
			'*.bundle.js',
		],
	};
	const cli = new CLIEngine(eslintConfig);
	const formatter = cli.getFormatter();
	const report = cli.executeOnFiles([configuration.modulePath]);

	console.log(formatter(report.results));

	if (options.fix)
		CLIEngine.outputFixes(report);

	if (report.errorCount > 0)
		process.exit(1);
	else if (report.warningCount > 0)
		if (report.warningCount > 1)
			cmd.warn(`There are ${report.warningCount} warnings`);
		else
			cmd.warn(`There is still ${report.warningCount} warning left`);
	else
		cmd.log('Linting has been succesfull! All is good :)');
};
