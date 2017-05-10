const shell = require('shelljs');
const path = require('path');
const cmd = require('../../shared/cmd');

const template = require('lodash/template');

/**
 * Scaffold a config
 *
 * @param  {string} name
 */
module.exports = (name = '') => {
	const filename = '.snowConfig.json';
	const destination = process.cwd();
	const templateConfigFile = path.join(__dirname, 'template', filename);

	// Count the operation
	cmd.runCountLog(() => {
		const filePath = path.join(destination, filename);
		shell.cp(templateConfigFile, filePath);

		// Compile te file and write to the new file
		const compiledTemplate = template(shell.cat(filePath));
		const fileContents = shell.ShellString(compiledTemplate({
			name,
		}));
		fileContents.to(filePath);
	}, 'Created the file {file} in {duration}', {
		file: filename,
	});
};
