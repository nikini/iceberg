const copyFile = require('../../tasks/copy/copy-file');

module.exports = {
	/**
	 * For each individual file
	 *
	 * @param  {Object} [file={}]
	 * @param  {Object} [options={}]
	 * @param  {Object} [config={}]
	 */
	single(file = {}, options = {}, config = {}) {
		// File extension for the files that will get copied
		const resourcesExtensions = [
			'js', 'map', 'json', 'html', 'css', 'xml',
			'png', 'jpg', 'jpeg', 'gif', 'svg',
		];

		// Only applies to xmls
		if (resourcesExtensions.indexOf(file.extension) < 0)
			return;

		copyFile(file.filepath, config.destination, config.source, options.silent);
	},
};
