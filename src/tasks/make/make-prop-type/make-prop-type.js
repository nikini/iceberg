const shell = require('shelljs');
const path = require('path');
const cmd = require('../../shared/cmd');
const getPropTypeDataFromName = require('./helpers/get-prop-type-data-from-name');
const getDestination = require('../helpers/get-destination');

const template = require('lodash/template');

/**
 * Scaffold a prop type
 *
 * @param  {string} name
 */
module.exports = (name = '') => {
	if (!name) {
		cmd.error('You must provide a prop type name');
		return;
	}
	const data = getPropTypeDataFromName(name);
	const destination = getDestination(name);
	const templateDir = path.join(__dirname, 'template');

	shell.ls('-A', templateDir).forEach((filename) => {
		// Copy the file (as is)
		const compiledFileName = filename.replace(/_dashName_/g, data.dashName);
		const fileDestination = path.join(destination, compiledFileName);
		const filePath = path.join(templateDir, filename);

		// Count the operation
		cmd.runCountLog(() => {
			shell.cp(filePath, fileDestination);

			// Compile te file and write to the new file
			const compiledTemplate = template(shell.cat(filePath));
			const fileContents = shell.ShellString(compiledTemplate(data));
			fileContents.to(fileDestination);
		}, 'Created the file {file} in {duration}', {
			file: compiledFileName,
		});
	});
};
