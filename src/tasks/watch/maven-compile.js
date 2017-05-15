const spawn = require('child_process').spawn;
const cmd = require('../shared/cmd');

/**
 * Compiles maven and then runs the callback
 *
 * @param  {function} callback
 */
module.exports = (callback = false) => {
	cmd.log('Starting maven compile');
	const command = spawn('mvn', ['compile']);

	command.stdout.on('data', (data) => {
		process.stdout.write(data.toString());
	});

	command.on('close', (code) => {
		if (code > 0)
			cmd.error(`Maven compile exited with code ${code}`);
		else {
			if (typeof callback === 'function')
				callback();
			cmd.log('Maven compile finished');
		}
	});
};
