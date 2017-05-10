const camelize = require('underscore.string/camelize');
const dasherize = require('underscore.string/dasherize');
const startsWith = require('underscore.string/startsWith');
const endsWith = require('underscore.string/endsWith');
const trim = require('underscore.string/trim');

/**
 * Function that spits out all the information about the file
 *
 * @param  {string} name
 *
 * @return {Object}
 */
module.exports = (name) => {
	let dashName = dasherize(name);
	if (startsWith(dashName, '-'))
		dashName = trim(dashName, '-');
	if (endsWith(dashName, '-component'))
		dashName = dashName.replace(/-component$/, '');
	const camelCaseName = camelize(dashName);
	const dirName = dashName + '-component';

	return {
		dashName,
		dirName,
		camelCaseName,
	};
};
