const babelConfig = require('../../configs/babel-config');

const babelConfigObject = babelConfig({
	single: true,
});

module.exports = require('babel-jest').createTransformer(babelConfigObject);
