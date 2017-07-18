const each = require('lodash/each');

/**
 * Exports the types of tasks that the watch has
 *
 * @param  {string} only
 * @param  {string} property
 */
module.exports = (only = '', property = 'watch') => {
	const tasks = {
		cache: {
			watch: true,
			run: true,
		},
		'maven-compile': {
			watch: true,
			run: true,
		},
		resources: {
			watch: true,
			run: false,
		},
		webpack: {
			watch: true,
			run: true,
		},
		jest: {
			watch: true,
			run: true,
		},
		livereload: {
			watch: true,
			run: false,
		},
		'flow-check': {
			watch: false,
			run: true,
		},
		'dev-server': {
			watch: true,
			run: false,
		},
	};
	const final = {};
	each(tasks, (element, key) => {
		if (key !== only && (!property || element[property]))
			final[key] = element;
	});

	return Object.keys(final);
};
