#!/usr/bin/env node
const program = require('commander');
const watch = require('./src/tasks/watch/watch');
const make = require('./src/tasks/make/make');
const build = require('./src/tasks/build/build');
const init = require('./src/tasks/init/init');
const remove = require('./src/tasks/remove/remove');
const currentPackage = require('./package.json');

program
	.version(currentPackage.version);

program
	.command('watch')
	.description('Watch files, copy resources, build SASS and JS (if needed)')
	.option('-e, --exclude <package,package>', 'What to exclude (if not already excluded)')
	.option('-s, --single', 'Run once and then exit (webpack and karma)')
	.option('--silent', 'This flag will hide OS notifications')
	.action((options) => {
		watch({
			exclude: (options.exclude || '').split(','),
			single: Boolean(options.single),
			silent: Boolean(options.silent),
		});
	})
	.on('--help', () => {
		console.log('  Examples:');
		console.log();
		console.log('    $ pasnow watch');
		console.log('    $ pasnow watch -e karma,webpack');
		console.log('    $ pasnow watch --exclude resources,cache,java');
		console.log('    $ pasnow watch -s --silent');
		console.log();
		console.log('  For exclude you can use: [cache, java, resources, webpack, karma, livereload]');
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
		console.log('    $ pasnow make visualization -t component');
		console.log('    $ pasnow make highcharts --type component');
		console.log('    $ pasnow make -t lint-files');
		console.log();
		console.log('  For type you can use: [component, config, lint-files]');
		console.log();
	});

program
	.command('build')
	.description('Builds the JS for production')
	.action(() => {
		build();
	});

program
	.command('init')
	.description('Initializes pasnow in the current project (must have a package.json)')
	.action(() => {
		init();
	});

program
	.command('remove')
	.description('Removes pasnow from the current project (must have a package.json)')
	.action(() => {
		remove();
	});

program.parse(process.argv);

// Display help if no parameters are passed
if (!process.argv.slice(2).length)
	program.outputHelp();
