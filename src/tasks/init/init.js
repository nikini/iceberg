const path = require('path');
const shell = require('shelljs');
const inquirer = require('inquirer');
const cmd = require('../shared/cmd');
const make = require('../make/make');
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

	if (cwdPackageConfig.devDependencies.pasnow) {
		cmd.error(`"pasnow" already exists as a dev dependency: ${cwdPackageConfig.devDependencies.pasnow}`);
		return;
	}

	// Add the pasnow to the dev dependency
	cwdPackageConfig.devDependencies.pasnow = `^${currentPackage.version}`;

	// Write it back to the file
	cmd.runCountLog(() => {
		packageConfig.set(cwdPackageConfig);
	}, 'Added "pasnow" as a dev dependency in {duration}', {});

	cmd.log('Running npm install now');

	const child = exec('npm install', (error, stdout, stderr) => {
		if (error) {
			cmd.error(`Error: ${error}`);
			return;
		}
		console.log(stdout);

		const questions = [{
			name: 'name',
			message: 'What is the name of your project?',
			validate(input) {
				return new Promise((accept, reject) => {
					if (!input.trim())
						reject('The name cannot be empty');
					accept();
				});
			},
		}];

		const prompt = inquirer.createPromptModule();
		prompt(questions).then((answers) => {
			make('config', answers.name);
		});

		cmd.log('Succesfully installed "pasnow" in current directory');
	});
};
