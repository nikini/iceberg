const request = require('request');
const cmd = require('../shared/cmd');
const colors = require('colors');

/**
 * Clears the cache
 *
 * @param  {string} source
 */
module.exports = (host = 'localhost', port = '8080') => {
	const url = colors.gray(`http://${host}:${port}/cache.do`);
	cmd.log(`Starting cache clear (${url})`);

	request(`http://${host}:${port}/cache.do`, (error, response, body) => {
		if (error)
			cmd.error(error);
		else
			cmd.log('Cache cleared succesfully');
	});
};
