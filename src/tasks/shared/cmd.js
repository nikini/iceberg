const now = require('./now');
const colors = require('colors');
const each = require('lodash/each');

/**
 * Console
 */
module.exports = {
	/**
	 * Console log arguments
	 */
	log(...args) {
		args.unshift(now());
		console.log.apply(console, args);
	},

	/**
	 * Console error arguments
	 */
	error(...args) {
		const parameters = args.map((param) => {
			return colors.red(param);
		});
		parameters.unshift(now());
		console.error.apply(console, parameters);
	},

	/**
	 * Run a function, count how long it takes and log the ending
	 *
	 * @param  {Function} callback
	 * @param  {string}   [message='']
	 * @param  {Object}   [data={}]
	 */
	runCountLog(callback, message = '', data = {}) {
		const timeStart = Date.now();
		callback();
		const timeEnd = Date.now();
		data.duration = (timeEnd - timeStart) + 'ms';

		let finalMessage = message || 'Task done in {duration}';
		each(data, (value, key) => {
			const coloredValue = colors.gray(value);
			finalMessage = finalMessage.replace('{' + key + '}', coloredValue);
		});

		this.log(finalMessage);
	},
};
