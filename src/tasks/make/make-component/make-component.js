const shell = require('shelljs');
const path = require('path');
const cmd = require('../../shared/cmd');
const getComponentDataFromName = require('./helpers/get-component-data-from-name');

const template = require('lodash/template');

/**
 * Scaffold a component
 *
 * @param  {string} name
 */
module.exports = (name = '') => {
	const data = getComponentDataFromName(name);

	const destination = path.join(process.cwd(), data.dirName);
	cmd.runCountLog(() => {
		shell.mkdir('-p', destination);
	}, 'Created directory {destination} in {duration}', {
		destination,
	});

	const templateDir = path.join(__dirname, 'template', 'component');
	shell.ls(templateDir).forEach((file) => {
		// Copy the file (as is)
		const compiledFileName = file.replace(/_dashName_/g, data.dashName);
		const fileDestination = path.join(destination, compiledFileName);
		const filePath = path.join(templateDir, file);

		// Count the operation
		cmd.runCountLog(() => {
			shell.cp(filePath, fileDestination);

			// Compile te file and write to the new file
			const compiledTemplate = template(shell.cat(filePath));
			const fileContents = shell.ShellString(compiledTemplate(data));
			fileContents.to(fileDestination);
		}, 'Created the file {file} in {duration}', {
			file: path.join(data.dirName, compiledFileName),
		});
	});
};
