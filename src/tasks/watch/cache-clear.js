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

	request(`http://${host}:${port}/cache.do`, (error, response, body) => {
		if (error)
			cmd.error(error);
		else {
			cmd.log('Cache cleared succesfully');

			if (!silent)
				notify('Cache cleared succesfully');

			if (typeof callback === 'function')
				callback();
		}
	});
};
