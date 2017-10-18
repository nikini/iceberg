const shell = require('shelljs');
const path = require('path');
const inquirer = require('inquirer');
const cmd = require('../../shared/cmd');
const template = require('lodash/template');
const getQuestions = require('./helpers/get-questions');

/**
 * Scaffold other files
 *
 * @param  {string} name
 */
module.exports = (name = '') => {
	const destination = process.cwd();
	const templateDir = path.join(__dirname, 'template');
	const options = {
		name,
	};

	const prompt = inquirer.createPromptModule();
	prompt(getQuestions(name)).then((answers) => {
		// Transform the answers into options
		if (options.name)
			answers.name = options.name;

		shell.ls('-A', templateDir).forEach((filename) => {
			// Count the operation
			cmd.runCountLog(() => {
				const templateConfigFile = path.join(templateDir, filename);
				const filePath = path.join(destination, filename);
				shell.cp(templateConfigFile, filePath);

				// Compile te file and write to the new file
				const compiledTemplate = template(shell.cat(filePath));
				const fileContents = shell.ShellString(compiledTemplate(answers));
				fileContents.to(filePath);
			}, 'Created the file {file} in {duration}', {
				file: filename,
			});
		});
	});
};
