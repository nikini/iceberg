const json = require('../tasks/shared/json');

/**
 * Translations Loader
 *
 * @param  {string} content
 *
 * @return {string}
 */
module.exports = function translationsLoader(content) {
	// Do nothing if no regexp or no file
	if (!this.query.regexp || !this.query.file)
		return content;

	const regex = new RegExp(this.query.regexp, 'g');
	let result = regex.exec(content);

	while (result) {
		if (this.query.file && result && result[1]) {
			const str = result[1].replace(/\\\\/g, '\\').replace(/\\n/g, '\n');
			json.setVariable(this.query.file, false, str);
		}
		result = regex.exec(content);
	}

	return content;
};
