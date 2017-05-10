const shell = require('shelljs');
const cmd = require('../shared/cmd');
const path = require('path');

/**
 * Clears the cache
 *
 * @param  {string} file
 * @param  {string} destination
 * @param  {string} src
 */
module.exports = (file = '', destination = '', src = '') => {
	cmd.runCountLog(() => {
		// Get the filePath and get the destinationPath
		const filePath = path.resolve(file);
		let destinationPath = path.resolve(destination);
		if (src) {
			const srcPath = path.resolve(src);
			destinationPath = path.join(destinationPath, filePath.replace(srcPath, ''));
		}

		// Make any dir if non existent
		shell.mkdir('-p', path.dirname(destinationPath));

		// Force copy to the folder
		shell.cp('-f', filePath, destinationPath);
	}, 'Copied {file} in {duration}', {
		file,
	});
};
