const babelConfig = require('../../configs/babel-config');

const babelConfigObject = babelConfig({
	single: true,
	test: true,
});

const transformer = require('babel-jest').createTransformer(babelConfigObject);

module.exports = transformer;
