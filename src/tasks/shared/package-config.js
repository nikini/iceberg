const path = require('path');
const cmd = require('../shared/cmd');
const json = require('./json');

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
		let packageJson = {};
		try {
			packageJson = json.get(packageJsonPath);
		} catch (e) {
			cmd.error('Could not find "package.json" in current folder. Please run `npm init` first');
			throw new Error('Not an npm project');
		}
		return packageJson;
	},

	/**
	 * Set a new package.json config
	 *
	 * @param {Object} config
	 */
	set(config) {
		const packageJsonPath = this.getLocation();
		json.set(packageJsonPath, config);
	},
};
