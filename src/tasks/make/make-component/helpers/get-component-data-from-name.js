const camelize = require('underscore.string/camelize');
const dasherize = require('underscore.string/dasherize');
const startsWith = require('underscore.string/startsWith');
const endsWith = require('underscore.string/endsWith');
const trim = require('underscore.string/trim');
const classify = require('underscore.string/classify');
const last = require('lodash/last');

/**
 * Function that spits out all the information about the file
 *
 * @param  {string} name
 *
 * @return {Object}
 */
module.exports = (name) => {
	const realName = last(name.split('/'));
	let dashName = dasherize(realName);
	if (startsWith(dashName, '-'))
		dashName = trim(dashName, '-');
	if (endsWith(dashName, '-component'))
		dashName = dashName.replace(/-component$/, '');
	const camelCaseName = camelize(dashName);
	const className = classify(dashName);
	const dirName = dashName;

	const cssClassName = (startsWith(dashName, 'pa-') ? '' : 'pa-') + dashName;

	return {
		dashName,
		dirName,
		camelCaseName,
		className,
		cssClassName,
	};
};
