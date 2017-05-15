const path = require('path');
const shell = require('shelljs');

module.exports = (name = '') => {
	const validDirectoryPath = (...args) => {
		const pathToCheck = path.join.apply(path, args);
		if (!shell.test('-e', pathToCheck))
			return 'Path does not exist';
		if (!shell.test('-d', pathToCheck))
			return 'Path must be a folder';
		return true;
	};
	const validFilePath = (...args) => {
		const pathToCheck = path.join.apply(path, args);
		if (!shell.test('-e', pathToCheck))
			return 'Path does not exist';
		if (!shell.test('-f', pathToCheck))
			return 'Path must be a file';
		return true;
	};

	const questions = [{
		name: 'plugin',
		type: 'input',
		message: 'What is the name of your plugin?',
		validate(input) {
			if (!input)
				return 'Plugin name cannot be empty';
			return validDirectoryPath(process.cwd(), 'src/main/plugins', input);
		},
	}, {
		name: 'entry',
		type: 'input',
		message: 'What is the name of you entry file JS?',
		default: 'index.js',
		validate(input, answers) {
			return validFilePath(process.cwd(), 'src/main/plugins', answers.plugin, 'ui.html/scripts', input);
		},
	}];

	if (!name)
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

	return questions;
};
