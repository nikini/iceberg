const execFile = require('child_process').execFile;
const cmd = require('../shared/cmd');
const flow = require('flow-bin');

/**
 * Run flow check
 */
module.exports = () => {
	execFile(flow, ['check'], (err, stdout) => {
		if (err)
			cmd.error(err);
		else
			cmd.log(stdout);
	});
};
