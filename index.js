#!/usr/bin/env node
const program = require('commander');
const watch = require('./src/tasks/watch/watch');
const run = require('./src/tasks/run/run');
const make = require('./src/tasks/make/make');
const build = require('./src/tasks/build/build');
const generateTranslations = require('./src/tasks/generate-translations/generate-translations');
const init = require('./src/tasks/init/init');
const remove = require('./src/tasks/remove/remove');
const currentPackage = require('./package.json');
const tasksLister = require('./src/tasks/watch/tasks-lister');

// Form the string to be used later
const watchTasks = '[' + tasksLister('', 'watch').join(', ') + ']';
const runTasks = '[' + tasksLister('', 'run').join(', ') + ']';

program
	.version(currentPackage.version);

program
	.command('watch [bundle]')
	.description('Watch files, copy resources, build SASS and JS (if needed)')
	.option('-e, --exclude <packages>', 'What to exclude (if not already excluded)')
	.option('-s, --single', 'Run once and then exit (webpack and jest)')
	.option('--silent', 'This flag will hide OS notifications')
	.option('--host <hostname>', 'Hostname for the cache clear')
	.option('--port <port>', 'Port for the cache clear')
	.option('--dev-port <dev-port>', 'Port for the webpack-dev-server')
	.option('--prod', 'Production environment (builds just like for production without the split)')
	.action((bundle, options) => {
		watch({
			exclude: (options.exclude || '').split(','),
			single: Boolean(options.single),
			silent: Boolean(options.silent),
			host: options.host,
			port: options.port,
			devPort: options.devPort,
			production: options.prod,
			bundle,
		});
	})
	.on('--help', () => {
		console.log('  Examples:');
		console.log();
		console.log('    $ iceberg watch');
		console.log('    $ iceberg watch --prod');
		console.log('    $ iceberg watch -e jest,webpack');
		console.log('    $ iceberg watch --exclude resources,cache,maven-compile');
		console.log('    $ iceberg watch -s --silent');
		console.log('    $ iceberg watch -e jest --dev-port 9091');
		console.log();
		console.log('  For exclude you can use: ' + watchTasks);
		console.log();
	});

program
	.command('run <package>')
	.description('Run a package, such as: ' + runTasks)
	.option('--silent', 'This flag will hide OS notifications')
	.option('--host <hostname>', 'Hostname for the cache clear')
	.option('--port <port>', 'Port for the cache clear')
	.option('--fix', 'This is only useful for eslint. Fixes some linting errors')
	.action((packageName, options) => {
		run({
			package: packageName,
			silent: Boolean(options.silent),
			host: options.host,
			port: options.port,
			fix: options.fix,
		});
	})
	.on('--help', () => {
		console.log('  Examples:');
		console.log();
		console.log('    $ iceberg run jest --silent');
		console.log('    $ iceberg run webpack');
		console.log('    $ iceberg run cache --host localhost --port 8080');
		console.log('    $ iceberg run eslint --fix');
		console.log();
		console.log('  For package you can use: ' + runTasks);
		console.log();
	});

program
	.command('make [name]')
	.description('Scaffolding tool to make components etc')
	.option('-t, --type <type>', 'What do you want to scaffold (eg: component)')
	.action((name, options) => {
		make(options.type, name);
	})
	.on('--help', () => {
		console.log('  Examples:');
		console.log();
		console.log('    $ iceberg make common/visualization -t component');
		console.log('    $ iceberg make highcharts --type component');
		console.log('    $ iceberg make -t lint-files');
		console.log('    $ iceberg make common/visualization/chart-options -t prop-type');
		console.log();
		console.log('  For type you can use: [component, prop-type, config, lint-files]');
		console.log();
	});

program
	.command('build [bundle]')
	.description('Builds the JS for production')
	.action((bundle) => {
		build({
			bundle,
		});
	});

program
	.command('i18n')
	.description('Generates the i18n file')
	.action((bundle) => {
		generateTranslations({
			bundle,
		});
	});

program
	.command('init')
	.description('Initializes iceberg in the current project (must have a package.json)')
	.action(() => {
		init();
	});

program
	.command('remove')
	.description('Removes iceberg from the current project (must have a package.json)')
	.action(() => {
		remove();
	});

program.parse(process.argv);

// Display help if no parameters are passed
if (!process.argv.slice(2).length)
	program.outputHelp();
