const path = require('path');
const getConfig = require('../../shared/get-config');

/**
 * Function that spits out a path from the given name
 *
 * @param  {string} name
 *
 * @return {string}
 */
module.exports = (name) => {
	const arrPath = name.split('/');
	arrPath.pop();
	if (!arrPath.length)
		return process.cwd();

	const configuration = getConfig();
	arrPath.unshift(path.resolve(configuration.modulePath)); // js path
	return path.join.apply(path, arrPath);
};
