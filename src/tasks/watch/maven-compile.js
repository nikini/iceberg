const spawn = require('child_process').spawn;
const cmd = require('../shared/cmd');

/**
 * Clears the cache
 *
 * @param  {string} source
 */
module.exports = () => {
	cmd.log('Starting maven compile');
	const command = spawn('mvn', ['compile']);

	command.stdout.on('data', (data) => {
		process.stdout.write(data.toString());
	});

	command.on('close', (code) => {
		if (code > 0)
			cmd.error(`Maven compile exited with code ${code}`);
		else
			cmd.log('Maven compile finished');
	});
};
