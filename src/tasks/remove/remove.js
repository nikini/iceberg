const path = require('path');
const shell = require('shelljs');
const inquirer = require('inquirer');
const cmd = require('../shared/cmd');
const exec = require('child_process').exec;
const packageConfig = require('../shared/package-config');
const currentPackage = require('../../../package.json');

/**
 * Installs pa snow to the current project
 */
module.exports = () => {
	const cwdPackageConfig = packageConfig.get();

	// If there are no current dev dependencies, then
	if (!cwdPackageConfig.devDependencies)
		cwdPackageConfig.devDependencies = {};

	if (!cwdPackageConfig.devDependencies.pasnow) {
		cmd.error('Good news/Bad news: "pasnow" doesn\'t exists as a dev dependency.');
		return;
	}

	// Remove the pasnow from the dev dependency
	delete cwdPackageConfig.devDependencies.pasnow;

	// Write it back to the file
	cmd.runCountLog(() => {
		packageConfig.set(cwdPackageConfig);
	}, 'Removed "pasnow" as a dev dependency in {duration}', {});

	cmd.log('Running npm prune now');

	const child = exec('npm prune', (error, stdout, stderr) => {
		if (error) {
			cmd.error(`Error: ${error}`);
			return;
		}
		console.log(stdout);

		const questions = [{
			name: 'removeConfig',
			type: 'confirm',
			message: 'Would you like to remove the configuration, as well?',
			default: false,
		}];

		const prompt = inquirer.createPromptModule();
		prompt(questions).then((answers) => {
			if (answers.removeConfig) {
				const configPath = path.join(process.cwd(), '.snowConfig.json');
				if (shell.test('-e', configPath))
					shell.rm(configPath);
				else
					cmd.warn('No configuration file found');
			}
			cmd.log('Succesfully removed "pasnow" in current directory');
		});
	});
};
