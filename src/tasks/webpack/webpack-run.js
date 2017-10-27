const cmd = require('../shared/cmd');
const head = require('lodash/head');
const isArray = require('lodash/isArray');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const getWebpackConfig = require('./get-webpack-config');
const openurl = require('openurl');

/**
 * Starts the webpack watch
 *
 * @param  {Object}   [options={}]
 * @param  {function} onComplete
 */
module.exports = (options = {}, onComplete) => {
	const config = getWebpackConfig(options);
	if (!config) {
		cmd.error('Could not find webpack configuration');
		throw new Error('no-configuration-found');
	}
	const selectedConfig = isArray(config) ? head(config) : config;
	const compiler = webpack(config);

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
		WebpackDevServer.addDevServerEntrypoints(config, options);
		const server = new WebpackDevServer(compiler, selectedConfig.devServer);

		server.listen(selectedConfig.devServer.port, 'localhost', () => {
			cmd.log(`Starting dev server on http://localhost:${selectedConfig.devServer.port}`);
			openurl.open(`http://localhost:${selectedConfig.devServer.port}`);
		});
	}
};
