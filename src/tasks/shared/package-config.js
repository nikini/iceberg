const path = require('path');
const shell = require('shelljs');
const cmd = require('../shared/cmd');

/**
 * Package config related methods
 */
module.exports = {
	/**
	 * Get the location of the current package.json
	 *
	 * @return {string}
	 */
	getLocation() {
		return path.join(process.cwd(), 'package.json');
	},

	/**
	 * Get the current package.json object
	 *
	 * @return {Object}
	 */
	get() {
		const packageJsonPath = this.getLocation();
		const packageJson = shell.cat(packageJsonPath);
		if (!packageJson.toString()) {
			cmd.error('Could not find "package.json" in current folder. Please run `npm init` first');
			throw new Error('Not an npm project');
		}
		return JSON.parse(packageJson.toString());
	},

	/**
	 * Set a new package.json config
	 *
	 * @param {Object} config
	 */
	set(config) {
		const packageJsonPath = this.getLocation();
		const fileContents = shell.ShellString(JSON.stringify(config, null, 2));
		fileContents.to(packageJsonPath);
	},
};
