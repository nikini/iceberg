const cmd = require('../shared/cmd');
const makeComponent = require('./make-component/make-component');
const makeOther = require('./make-other/make-other');

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
		makeOther({
			name,
			only: ['.snowConfig.json'],
		});

	if (type === 'lint-files')
		makeOther({
			name,
			exclude: ['.snowConfig.json'],
		});
};
