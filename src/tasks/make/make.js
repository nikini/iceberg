const cmd = require('../shared/cmd');
const makeComponent = require('./make-component/make-component');
const makeConfig = require('./make-config/make-config');

/**
 * Scaffold something
 *
 * @param  {string} type
 * @param  {string} name
 */
module.exports = (type = 'component', name = '') => {
	if (type === 'component')
		makeComponent(name);

	if (type === 'config')
		makeConfig(name);
};
