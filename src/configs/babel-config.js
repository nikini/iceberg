const browserSupport = require('./browser-support');
const path = require('path');
const packageNodeModulesPath = path.join(__dirname, '../../node_modules');

/**
 * Function that spits out the babel config
 *
 * @param  {Object} [options={}]
 *
 * @return {Object}
 */
module.exports = (options = {}) => {
	const plugins = [
		[`${packageNodeModulesPath}/babel-plugin-transform-object-rest-spread`],
		[`${packageNodeModulesPath}/babel-plugin-transform-react-display-name`],
		[`${packageNodeModulesPath}/babel-plugin-transform-function-bind`],
		[`${packageNodeModulesPath}/babel-plugin-transform-decorators-legacy`],
		[`${packageNodeModulesPath}/babel-plugin-transform-runtime`, {
			polyfill: true,
			regenerator: true,
		}],
		[`${packageNodeModulesPath}/babel-plugin-transform-class-properties`],
	];

	if (!options.production && !options.test)
		plugins.push([`${packageNodeModulesPath}/react-hot-loader/babel`]);

	// if (options.test)
	// 	plugins.push([`babel-plugin-transform-es2015-modules-commonjs`]);

	return {
		cacheDirectory: true,
		babelrc: false,
		compact: true,
		presets: [
			`${packageNodeModulesPath}/babel-preset-react`, [`${packageNodeModulesPath}/babel-preset-env`, {
				targets: {
					browsers: browserSupport,
				},
				modules: options.test ? 'commonjs' : false,
			}],
		],
		comments: false,
		plugins,
	};
};
