const spawn = require('child_process').spawn;
const cmd = require('../shared/cmd');
const notify = require('../shared/notify');

/**
 * Compiles maven and then runs the callback
 *
 * @param  {Function} [callback=false]
 * @param  {Boolean}  [silent=false]
 */
module.exports = (callback = false, silent = false) => {
	cmd.log('Starting maven compile');
	const command = spawn('mvn', ['compile']);

	command.stdout.on('data', (data) => {
		process.stdout.write(data.toString());
	});

	command.on('close', (code) => {
		if (code > 0)
			cmd.error(`Maven compile exited with code ${code}`);
		else {
			cmd.log('Maven compile finished');

			if (!silent)
				notify('Maven compile finished');

			if (typeof callback === 'function')
				callback();
		}
	});
};
