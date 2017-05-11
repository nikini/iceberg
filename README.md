# PA ServiceNow Tool

[![NPM Version](http://img.shields.io/npm/v/pasnow.svg?style=flat)](https://www.npmjs.org/package/pasnow)
[![NPM Downloads](https://img.shields.io/npm/dm/pasnow.svg?style=flat)](https://www.npmjs.org/package/pasnow)

This tool has [webpack](https://github.com/webpack/webpack), [karma](https://github.com/karma-runner/karma) and other technologies built in to help you bundle and test your angular module

## Installation

You should install it globally first:

    $ npm install pasnow -g

and then run, in your project folder:

    $ pasnow init

## Watch

The watch starts the webpack watch, karma watch and the resources copy. You can choose to ignore: `cache`, `java`, `resources`.

    $ pasnow watch

The options for the watch are:

    -h, --help                outputs the usage information
    -i, --include <packages>  what packages to include (separated by comma)
    -e, --exclude <packages>  what packages to exclude (separated by comma)
    -s, --single              if included, it will run once and exit

#### Examples

    $ pasnow watch -i cache
    $ pasnow watch --exclude resources,cache

## Make

A tool to scaffold components, configs or linting configs.

    $ pasnow make [name] [options]

The options for the make are:

    -h, --help      	outputs the usage information
    -t, --type <type>	the type of element you are scaffolding

For type you can use: `component`, `config`, `lint-files`.

#### Examples

    $ pasnow make visualization -t component
    $ pasnow make --type lint-files
    $ pasnow make -t config

## Build

It builds the JS bundle ready for production

    $ pasnow build

## Remove

Remove pasnow from the project.

    $ pasnow remove

## License

MIT
