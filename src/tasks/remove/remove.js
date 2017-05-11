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

	if (!cwdPackageConfig.devDependencies.pasnow) {
		cmd.error('Good news/bad news: "pasnow" doesn\'t exists as a dev dependency.');
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
		cmd.log('Succesfully removed "pasnow" in current directory');
		cmd.log('You can also remove the configuration file now (.snowConfig.json)');
	});
};
