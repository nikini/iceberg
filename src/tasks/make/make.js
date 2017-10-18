const cmd = require('../shared/cmd');
const makeComponent = require('./make-component/make-component');
const makeOther = require('./make-other/make-other');
const makeConfig = require('./make-config/make-config');
const makePropType = require('./make-prop-type/make-prop-type');

/**
 * Scaffold something
 *
 * @param  {string} type
 * @param  {string} name
 */
module.exports = (type = '', name = '') => {
	const supported = ['component', 'prop-type', 'config', 'lint-files'];
	if (!type) {
		cmd.error('Please specify a type. Use --help if you are confused.');
		return;
	}

	if (supported.indexOf(type) < 0) {
		cmd.error('Invalid type specified. Use --help if you are confused.');
		return;
	}

	if (type === 'component')
		makeComponent(name);

	if (type === 'prop-type')
		makePropType(name);

	if (type === 'config')
		makeConfig(name);

	if (type === 'lint-files')
		makeOther({
			name,
			exclude: ['.iceConfig.json'],
		});
};
