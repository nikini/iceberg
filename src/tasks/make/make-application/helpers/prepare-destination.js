const path = require('path');
const shell = require('shelljs');
const getDataFromName = require('../../helpers/get-data-from-name');

module.exports = (name) => {
	const projectPath = path.resolve(process.cwd(), name);
	const data = getDataFromName(projectPath);

	// The destination where we'll be copying
	let destination = projectPath;
	if (!shell.test('-d', projectPath)) {
		destination = path.resolve(process.cwd(), data.dashName);
		if (!shell.test('-d', destination))
			shell.mkdir('-p', destination);
	}

	return destination;
};
