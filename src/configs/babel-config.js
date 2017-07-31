const transformClassPropertiesPlugin = require('babel-plugin-transform-class-properties');

/**
 * Function that spits out the babel config
 *
 * @param  {Object} [options={}]
 *
 * @return {Object}
 */
module.exports = (options = {}) => {
	const developmentPlugins = [
		['transform-object-rest-spread'],
		['transform-react-display-name'],
		['transform-function-bind'],
	];

	if (!options.single)
		developmentPlugins.push(['react-transform', {
			transforms: [{
				transform: 'react-transform-hmr',
				imports: ['react'],
				locals: ['module'],
			}, {
				transform: 'react-transform-catch-errors',
				imports: ['react', 'redbox-react'],
			}],
		}]);

	return {
		cacheDirectory: true,
		babelrc: false,
		presets: [
			'react', ['env', {
				targets: {
					browsers: ['> 1%', 'last 2 versions'],
				},
			}],
		],
		comments: false,
		plugins: [
			transformClassPropertiesPlugin,
		],
		env: {
			development: {
				plugins: developmentPlugins,
			},
			production: {
				plugins: [
					['transform-object-rest-spread'],
					['transform-react-display-name'],
					['transform-function-bind'],
				],
			},
			test: {
				plugins: ['transform-es2015-modules-commonjs'],
			},
		},
	};
};
