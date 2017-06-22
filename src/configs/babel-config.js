const transformClassPropertiesPlugin = require('babel-plugin-transform-class-properties');

module.exports = {
	cacheDirectory: true,
	babelrc: false,
	presets: ['react', 'es2015'],
	comments: false,
	plugins: [
		transformClassPropertiesPlugin,
	],
	env: {
		development: {
			plugins: [
				['transform-object-rest-spread'],
				['transform-react-display-name'],
				['react-transform', {
					transforms: [{
						transform: 'react-transform-hmr',
						imports: ['react'],
						locals: ['module'],
					}, {
						transform: 'react-transform-catch-errors',
						imports: ['react', 'redbox-react'],
					}],
				}],
			],
		},
		production: {
			plugins: [
				['transform-object-rest-spread'],
				['transform-react-display-name'],
			],
		},
	},
};
