const cmd = require('../shared/cmd');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('../../configs/webpack-config');

/**
 * Starts the webpack watch
 *
 * @param  {Object}   [options={}]
 * @param  {function} onComplete
 */
module.exports = (options = {}, onComplete) => {
	const config = webpackConfig(options);
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
		const server = new WebpackDevServer(compiler, config.devServer);
		server.listen(config.devServer.port, 'localhost', () => {
			cmd.log(`Starting dev server on http://localhost:${config.devServer.port}`);
		});
	}
};
