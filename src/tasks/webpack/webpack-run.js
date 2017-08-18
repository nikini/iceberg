const cmd = require('../shared/cmd');
const head = require('lodash/head');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const getWebpackConfig = require('./get-webpack-config');

/**
 * Starts the webpack watch
 *
 * @param  {Object}   [options={}]
 * @param  {function} onComplete
 */
module.exports = (options = {}, onComplete) => {
	const config = getWebpackConfig(options);
	const compiler = webpack(config);
	const firstConfig = head(config);

	if (options.single)
		compiler.run((err, stats) => {
			if (err)
				cmd.error(err);
			cmd.log(stats.toString({
				chunks: true,
				colors: true,
			}));

			if (onComplete)
				onComplete(err);
		});
	else if (options.exclude.indexOf('dev-server') >= 0)
		compiler.watch({}, (err, stats) => {
			if (err)
				cmd.error(err);
			cmd.log(stats.toString({
				chunks: false,
				colors: true,
			}));

			if (onComplete)
				onComplete(err);
		});
	else {
		const server = new WebpackDevServer(compiler, firstConfig.devServer);
		server.listen(firstConfig.devServer.port, 'localhost', () => {
			cmd.log(`Starting dev server on http://localhost:${firstConfig.devServer.port}`);
		});
	}
};
