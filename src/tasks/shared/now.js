const colors = require('colors');

module.exports = () => {
	const now = new Date();
	const time = colors.gray(now.toTimeString().substr(0, 8));
	return `[${time}]`;
};
