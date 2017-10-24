const path = require('path');
const shell = require('shelljs');
const cmd = require('../../../shared/cmd');
const template = require('lodash/template');

module.exports = function copyRecursively(projectPath, data, templateDir) {
	shell.ls('-A', templateDir).forEach((filename) => {
		// Count the operation
		cmd.runCountLog(() => {
			const templateConfigFile = path.join(templateDir, filename);
			const filePath = path.join(projectPath, filename);

			if (shell.test('-d', templateConfigFile)) {
				shell.mkdir('-p', filePath);
				copyRecursively(filePath, data, templateConfigFile);
				return;
			}

			shell.cp(templateConfigFile, filePath);

			// Compile te file and write to the new file
			const compiledTemplate = template(shell.cat(filePath));
			const fileContents = shell.ShellString(compiledTemplate(data));
			fileContents.to(filePath);
		}, 'Created the file {file} in {duration}', {
			file: filename,
		});
	});
};
