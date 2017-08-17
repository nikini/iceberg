const shell = require('shelljs');
const cmd = require('../shared/cmd');
const notify = require('../shared/notify');
const path = require('path');

/**
 * Copies one file
 *
 * @param  {string}  file
 * @param  {string}  destination
 * @param  {string}  src
 * @param  {Boolean} [silent=false]
 */
module.exports = (file = '', destination = '', src = '', silent = false) => {
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
	}, () => {
		// After the logging is done
		if (!silent) {
			let filename = file;
			const filePath = path.resolve(file);
			if (src) {
				const srcPath = path.resolve(src);
				filename = filePath.replace(srcPath, '');

				// If it starts with a / then remove the first one
				if (filename[0] === '/')
					filename = filename.substr(1);
			}
			notify(`Copied "${filename}"`);
		}
	});
};
