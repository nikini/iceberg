const fs = require('fs');
const cmd = require('../shared/cmd');
const path = require('path');
const glob = require('glob');
const copyFile = require('./copy-file');

/**
 * Copies a path
 *
 * @param  {string}   sourcePath
 * @param  {string}   destination
 * @param  {string}   src
 * @param  {Boolean}  [silent=false]
 * @param  {function} onComplete
 */
module.exports = (sourcePath = '', destination = '', src = '', silent = false, onComplete) => {
	const filePath = path.resolve(sourcePath);
	fs.lstat(filePath, (err, stats) => {
		if (err) {
			cmd.console.error(err);
			return;
		}

		if (stats.isDirectory())
			glob(filePath + '/**/*', {}, (globErr, files) => {
				if (globErr) {
					cmd.console.error(globErr);
					return;
				}

				files.forEach((file) => {
					copyFile(file, destination, src, silent);
				});
				if (onComplete)
					onComplete();
			});
		else {
			copyFile(sourcePath, destination, src, silent);
			if (onComplete)
				onComplete();
		}
	});
};
