const cmd = require('../shared/cmd');
const makeComponent = require('./make-component/make-component');
const makePropType = require('./make-prop-type/make-prop-type');
const makeApplication = require('./make-application/make-application');

/**
 * Scaffold something
 *
 * @param  {string} type
 * @param  {string} name
 */
module.exports = (type = '', name = '') => {
	const supported = ['component', 'prop-type', 'application'];
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

	if (type === 'application')
		makeApplication(name);
};
