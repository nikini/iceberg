const request = require('request');
const cmd = require('../shared/cmd');
const colors = require('colors');

/**
 * Clears the cache
 *
 * @param  {function} callback
 * @param  {string}   host
 * @param  {string}   port
 */
module.exports = (callback = false, host = 'localhost', port = '8080') => {
	const url = colors.gray(`http://${host}:${port}/cache.do`);
	cmd.log(`Starting cache clear (${url})`);

	request(`http://${host}:${port}/cache.do`, (error, response, body) => {
		if (error)
			cmd.error(error);
		else {
			if (typeof callback === 'function')
				callback();
			cmd.log('Cache cleared succesfully');
		}
	});
};
