const camelize = require('underscore.string/camelize');
const dasherize = require('underscore.string/dasherize');
const classify = require('underscore.string/classify');
const trim = require('underscore.string/trim');
const last = require('lodash/last');

/**
 * Function that spits out all the information about the file
 *
 * @param  {string} name
 *
 * @return {Object}git st
 */
module.exports = (name) => {
	const folderName = last(name.split('/'));
	const dashName = trim(dasherize(folderName), '-');
	const camelCaseName = camelize(dashName);
	const className = classify(dashName);
	const dirName = dashName;

	return {
		name: folderName,
		dashName,
		dirName,
		camelCaseName,
		className,
	};
};
