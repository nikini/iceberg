const path = require('path');
const shell = require('shelljs');
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
		cmd.log('Succesfully installed "pasnow" in current directory');
		cmd.log('Please create a configuration file now by running `pasnow make PA --type config`');
	});
};
