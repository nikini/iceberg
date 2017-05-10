#!/usr/bin/env node
const program = require('commander');
const watch = require('./src/tasks/watch/watch');
const make = require('./src/tasks/make/make');
const build = require('./src/tasks/build/build');

program
	.version('0.0.1');

program
	.command('watch')
	.description('Watch files, copy resources, build SASS and JS (if needed)')
	.option('-i, --include <package,package>', 'What to include (if not already included)')
	.option('-e, --exclude <package,package>', 'What to exclude (if not already excluded)')
	.option('-s, --single', 'Run once and then exit (webpack and karma)')
	.action((options) => {
		watch({
			baseLocation: './tasks/**/*.js',
			exclude: (options.exclude || '').split(','),
			include: (options.include || '').split(','),
			single: Boolean(options.single),
		});
	})
	.on('--help', () => {
		console.log('  Examples:');
		console.log();
		console.log('    $ pasnow watch');
		console.log('    $ pasnow watch -i cache');
		console.log('    $ pasnow watch --exclude resources,cache,java');
		console.log();
		console.log('  For include/exclude you can use: [cache, java, resources]');
		console.log();
	});

program
	.command('make <name>')
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
		console.log();
		console.log('  For type you can use: [component]');
		console.log();
	});

program
	.command('build')
	.description('Builds the JS for production')
	.action(() => {
		build();
	});

program.parse(process.argv);

// Display help if no parameters are passed
if (!process.argv.slice(2).length)
	program.outputHelp();
