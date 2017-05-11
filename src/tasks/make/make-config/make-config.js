const shell = require('shelljs');
const path = require('path');
const inquirer = require('inquirer');
const cmd = require('../../shared/cmd');
const template = require('lodash/template');

/**
 * Scaffold other files
 *
 * @param  {string} name
 */
module.exports = (name = '') => {
	const destination = process.cwd();
	const templateDir = path.join(__dirname, 'template');
	const filename = '.snowConfig.json';
	const options = {
		name,
	};

	const questions = [{
		name: 'modulePath',
		type: 'input',
		message: 'What is the path to your JS module (from the cwd)?',
		default: 'src/main/plugins/.../js',
		validate(input) {
			const modulePath = path.join(process.cwd(), input);
			if (!shell.test('-e', modulePath))
				return 'Path does not exist';
			if (!shell.test('-d', modulePath))
				return 'Path must be a folder';
			return true;
		},
	}, {
		name: 'sassPath',
		type: 'input',
		message: 'What is the path to your general SASS folder (where you keep the general sass files, not component specific - from the cwd)?',
		validate(input) {
			const sassPath = path.join(process.cwd(), input);
			if (!shell.test('-e', sassPath))
				return 'Path does not exist';
			if (!shell.test('-d', sassPath))
				return 'Path must be a folder';
			return true;
		},
	}, {
		name: 'entry',
		type: 'input',
		message: 'What is the name of you entry file JS (relative to the previously filled module path)?',
		validate(input, answers) {
			const entryPath = path.join(answers.modulePath, input);
			if (!shell.test('-e', entryPath))
				return 'Path does not exist';
			if (!shell.test('-f', entryPath))
				return 'Path must be a file';
			return true;
		},
	}, {
		name: 'outputPath',
		type: 'input',
		message: 'What is the path to the destination of the bundled js (from the cwd)?',
		validate(input) {
			const outputPath = path.join(process.cwd(), input);
			if (!shell.test('-e', outputPath))
				return 'Path does not exist';
			if (!shell.test('-d', outputPath))
				return 'Path must be a folder';
			return true;
		},
	}];

	if (!options.name)
		questions.unshift({
			name: 'name',
			type: 'input',
			message: 'What is the name of your project?',
			validate(input) {
				if (!input.trim())
					return 'The name cannot be empty';
				return true;
			},
		});

	const prompt = inquirer.createPromptModule();
	prompt(questions).then((answers) => {
		// Transform the answers into options
		if (options.name)
			answers.name = options.name;

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
};
