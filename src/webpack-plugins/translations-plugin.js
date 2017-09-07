module.exports = class TranslationsPlugin {
	constructor(options) {
		this.options = options;
	}

	apply(compiler) {
		compiler.plugin('should-emit', () => {
			return false;
		});
	}
};
