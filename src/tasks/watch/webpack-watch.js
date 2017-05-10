const cmd = require('../shared/cmd');
const webpack = require('webpack');
const webpackConfig = require('../../configs/webpack-config');

/**
 * Starts the webpack watch
 *
 * @param  {Object} [options={}]
 */
module.exports = (options = {}) => {
	const compiler = webpack(webpackConfig(options));

	if (options.single)
		compiler.run((err, stats) => {
			if (err)
				cmd.error(err);
			cmd.log(stats.toString());
		});
	else
		compiler.watch({}, (err, stats) => {
			if (err)
				cmd.error(err);
			cmd.log(stats.toString());
		});
};
