const path = require('path');
const inquirer = require('inquirer');
const cmd = require('../../shared/cmd');
const getDataFromName = require('../helpers/get-data-from-name');
const copyRecursively = require('./helpers/copy-recursively');
const prepareDestination = require('./helpers/prepare-destination');
const execSync = require('child_process').execSync;

/**
 * Scaffold other files
 *
 * @param  {string} name
 */
module.exports = (name = '') => {
	const templateDir = path.join(__dirname, 'template');
	const options = {
		name,
	};

	const afterQuestions = (answers) => {
		const startDirectory = process.cwd();
		const projectPath = path.resolve(startDirectory, answers.name);
		const data = getDataFromName(projectPath);
		const destination = prepareDestination(answers.name);

		copyRecursively(destination, data, templateDir);
		cmd.log();
		cmd.success('Succesfully created all the files');

		if (answers.createGitRepository !== false) {
			cmd.log();
			cmd.log('Running `git init` in folder');

			process.chdir(destination);
			execSync('git init', {
				stdio: [0, 1, 2],
			});
		}

		if (answers.runNpmInstall !== false) {
			cmd.log();
			cmd.log('Running `npm install` in folder');

			process.chdir(destination);
			execSync('npm install', {
				stdio: [0, 1, 2],
			});
		}

		cmd.log();
		cmd.success('Succesfully created the application');
		cmd.log();
		cmd.log('To start using it, run: ');

		if (destination !== startDirectory)
			cmd.log('    $ cd ' + data.dashName);

		cmd.log('    $ npm start');
		cmd.log();
	};

	if (!options.name) {
		const prompt = inquirer.createPromptModule();
		prompt([{
			name: 'name',
			type: 'input',
			message: 'What is the name of your application?',
			default: 'My React App',
			required: true,
		}, {
			name: 'createGitRepository',
			type: 'boolean',
			message: 'Would you like to initialize a git repo in that folder?',
			default: true,
		}, {
			name: 'runNpmInstall',
			type: 'boolean',
			message: 'Would you like to run `npm install` in that folder afterwards?',
			default: true,
		}]).then(afterQuestions);
	} else
		afterQuestions({
			name: options.name,
		});
};
