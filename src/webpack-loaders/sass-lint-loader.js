const sassLint = require('sass-lint');
const path = require('path');
const formatter = require('eslint/lib/formatters/stylish');

/**
 * Simple Sass Lint Loader
 *
 * @param  {string} content
 *
 * @return {string}
 */
module.exports = function sassLintLoader(content) {
	const configFile = path.join(process.cwd(), '.sass-lint.yml');
	const result = sassLint.lintFileText({
		text: content,
		format: path.extname(this.resourcePath).replace('.', ''),
		filename: path.relative(process.cwd(), this.resourcePath),
	}, {}, configFile);

	const formatedResult = formatter([result]);
	if (formatedResult)
		throw new Error(formatedResult);

	return content;
};
