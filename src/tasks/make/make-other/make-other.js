const shell = require('shelljs');
const path = require('path');
const cmd = require('../../shared/cmd');
const template = require('lodash/template');

/**
 * Scaffold other files
 *
 * @param  {Object} options
 */
module.exports = (options = {}) => {
	const destination = process.cwd();
	const templateDir = path.join(__dirname, 'template');

	shell.ls('-A', templateDir).forEach((filename) => {
		if (options.exclude && options.exclude.indexOf(filename) >= 0)
			return;

		if (options.only && options.only.indexOf(filename) < 0)
			return;

		// Count the operation
		cmd.runCountLog(() => {
			const templateConfigFile = path.join(templateDir, filename);
			const filePath = path.join(destination, filename);
			shell.cp(templateConfigFile, filePath);

			// Compile te file and write to the new file
			const compiledTemplate = template(shell.cat(filePath));
			const fileContents = shell.ShellString(compiledTemplate({
				name: options.name,
			}));
			fileContents.to(filePath);
		}, 'Created the file {file} in {duration}', {
			file: filename,
		});
	});
};
