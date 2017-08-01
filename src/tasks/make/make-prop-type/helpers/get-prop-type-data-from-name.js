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
	if (endsWith(dashName, '-prop-type'))
		dashName = dashName.replace(/-prop-type$/, '');
	if (endsWith(dashName, '-proptype'))
		dashName = dashName.replace(/-proptype$/, '');
	if (endsWith(dashName, '-type'))
		dashName = dashName.replace(/-type$/, '');

	const className = classify(dashName);

	return {
		dashName,
		className,
	};
};
