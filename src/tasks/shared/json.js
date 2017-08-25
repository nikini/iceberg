const shell = require('shelljs');
const cmd = require('../shared/cmd');
const isArray = require('lodash/isArray');

/**
 * Package config related methods
 */
module.exports = {

	/**
	 * Get the json object
	 *
	 * @param  {Object} jsonPath
	 *
	 * @return {Object}
	 */
	get(jsonPath) {
		const packageJson = shell.cat(jsonPath);
		if (!packageJson.toString()) {
			cmd.error('Could not find the JSON file');
			throw new Error('Could not find JSON');
		}
		return JSON.parse(packageJson.toString());
	},

	/**
	 * Set a new json
	 *
	 * @param  {Object} jsonPath
	 * @param  {Object} config
	 */
	set(jsonPath, config) {
		const fileContents = shell.ShellString(JSON.stringify(config, null, 2));
		fileContents.to(jsonPath);
	},

	/**
	 * Tries to write a variable to the file. If the key is boolean false, then
	 * it tries to write in an array, otherwise, in an object
	 *
	 * @param {string} jsonPath
	 * @param {string|Boolean} key
	 * @param {mixed} value
	 */
	setVariable(jsonPath, key, value) {
		// If file does not exist, create it
		if (!shell.test('-e', jsonPath))
			this.set(jsonPath, key === false ? [] : {});

		// Get the content and append it
		const content = this.get(jsonPath);
		if (key !== false && !isArray(content))
			content[key] = value;
		else if (key === false && isArray(content)) {
			if (content.indexOf(value) < 0)
				content.push(value);
		} else {
			cmd.error('Bad combination of array/object to key/value');
			throw new Error('not-array-or-object');
		}

		this.set(jsonPath, content);
	},
};
