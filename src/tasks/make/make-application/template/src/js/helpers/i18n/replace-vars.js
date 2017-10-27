/**
 * Replace the vars from the string with their value
 *
 * @param  {string} str
 * @param  {Object} vars
 *
 * @return {string}
 */
export const replaceVars = (str, vars) => {
	let result = str.toString();

	if (typeof vars !== 'object')
		return result;

	for (const key in vars)
		if (vars.hasOwnProperty(key)) {
			const regex = new RegExp('\\{' + key + '\\}', 'g');
			result = result.replace(regex, vars[key]);
		}

	return result;
};
