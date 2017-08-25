const path = require('path');
const shell = require('shelljs');
const inquirer = require('inquirer');
const cmd = require('../shared/cmd');
const exec = require('child_process').exec;
const packageConfig = require('../shared/package-config');

/**
 * Removes iceberg from the current project
 */
module.exports = () => {
	const cwdPackageConfig = packageConfig.get();

	// If there are no current dev dependencies, then
	if (!cwdPackageConfig.devDependencies)
		cwdPackageConfig.devDependencies = {};

	if (!cwdPackageConfig.devDependencies['iceberg-packer']) {
		cmd.error('Good news/Bad news: "iceberg-packer" doesn\'t exists as a dev dependency.');
		return;
	}

	// Remove the iceberg-packer from the dev dependency
	delete cwdPackageConfig.devDependencies['iceberg-packer'];

	// Write it back to the file
	cmd.runCountLog(() => {
		packageConfig.set(cwdPackageConfig);
	}, 'Removed "iceberg-packer" as a dev dependency in {duration}', {});

	cmd.log('Running npm prune now');

	exec('npm prune', (error, stdout) => {
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
				const configPath = path.join(process.cwd(), '.iceConfig.json');
				if (shell.test('-e', configPath))
					shell.rm(configPath);
				else
					cmd.warn('No configuration file found');
			}
			cmd.log('Succesfully removed "iceberg-packer" in current directory');
		});
	});
};
