const path = require('path');
const notifier = require('node-notifier');

/**
 * Sends an OS notification message
 *
 * @param  {string} [message='']
 */
module.exports = (message = '') => {
	notifier.notify({
		title: 'pasnow',
		message,
		sound: false, // Only Notification Center or Windows Toasters
		wait: false,
	});
};
