const request = require('request');
const colors = require('colors');
const cmd = require('../../tasks/shared/cmd');
const notify = require('../../tasks/shared/notify');

module.exports = {
	/**
	 * For each individual file
	 *
	 * @param  {Object} [file={}]
	 * @param  {Object} [options={}]
	 * @param  {Object} [config={}]
	 */
	single(file = {}, options = {}, config = {}) {
		// Only applies to xmls
		if (file.extension !== 'xml')
			return;

		const url = colors.gray(`http://${options.host}:${options.port}/${config.path}`);
		cmd.log(`Starting cache clear (${url})`);

		const timeStart = Date.now();
		request(url, (error) => {
			if (error) {
				cmd.error(error);

				if (!options.silent)
					notify('Could not clear cache! Check terminal for info.');
			} else {
				// Get the duration
				const timeEnd = Date.now();
				const duration = ((timeEnd - timeStart) / 1000).toFixed(3) + 's';
				const coloredDuration = colors.gray(duration);

				// Log [and notify]
				cmd.log(`Cache cleared succesfully in ${coloredDuration}`);

				if (!options.silent)
					notify(`Cache cleared succesfully in ${duration}`);
			}
		});
	},
};
