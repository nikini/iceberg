const request = require('request');
const cmd = require('../shared/cmd');
const colors = require('colors');
const notify = require('../shared/notify');

/**
 * Clears the cache
 *
 * @param  {Function} [callback=false]
 * @param  {string}   [host='localhost']
 * @param  {string}   [port='8080']
 * @param  {Boolean}  [silent=false]
 */
module.exports = (callback = false, host = 'localhost', port = '8080', silent = false) => {
	const url = colors.gray(`http://${host}:${port}/cache.do`);
	cmd.log(`Starting cache clear (${url})`);

	const timeStart = Date.now();
	request(`http://${host}:${port}/cache.do`, (error, response, body) => {
		if (error) {
			cmd.error(error);

			if (!silent)
				notify('Could not clear cache! Check terminal for info.');
		} else {
			// Get the duration
			const timeEnd = Date.now();
			const duration = ((timeEnd - timeStart) / 1000).toFixed(3) + 's';
			const coloredDuration = colors.gray(duration);

			// Log [and notify]
			cmd.log(`Cache cleared succesfully in ${coloredDuration}`);

			if (!silent)
				notify(`Cache cleared succesfully in ${duration}`);

			if (typeof callback === 'function')
				callback();
		}
	});
};
