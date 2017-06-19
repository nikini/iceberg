# Iceberg Tool

[![NPM Version](http://img.shields.io/npm/v/iceberg-packer.svg?style=flat)](https://www.npmjs.org/package/iceberg-packer)
[![NPM Downloads](https://img.shields.io/npm/dm/iceberg-packer.svg?style=flat)](https://www.npmjs.org/package/iceberg-packer)

This tool has [webpack](https://github.com/webpack/webpack), [karma](https://github.com/karma-runner/karma) and other technologies built in to help you bundle and test your angular module

## Installation

You should install it globally first:

```
$ npm install iceberg-packer -g
```

and then run, in your project folder:

```
$ iceberg init
```

## Watch

The watch starts the webpack watch, karma watch and the resources copy. You can choose to exclude: `cache`, `maven-compile`, `resources`, `webpack`, `karma`, `livereload`.

```
$ iceberg watch
```

The options for the watch are:

```
 -h,  --help                outputs the usage information
 -e,  --exclude <packages>  what packages to exclude (separated by comma)
 -s,  --single              run once and then exit (webpack and karma)
 --silent                   this flag will hide OS notifications
 --host                     hostname for the cache clear
 --port                     port for the cache clear
```

#### Examples

```
$ iceberg watch --e karma,webpack
$ iceberg watch --exclude resources,cache,maven-compile
$ iceberg watch -s --silent
```

## Run

The run command starts a task, like: `cache`, `maven-compile`, `webpack`, `karma`, `flow-check`.

```
$ iceberg run <package>
```

The options for the run are:

```
 -h,  --help                outputs the usage information
 --silent                   this flag will hide OS notifications
 --host                     hostname for the cache clear
 --port                     port for the cache clear
```

#### Examples

```
$ iceberg run karma --silent
$ iceberg run webpack
$ iceberg run cache --host localhost --port 8081
```

## Make

A tool to scaffold components, configs or linting configs.

```
$ iceberg make [name] [options]
```

The options for the make are:

```
 -h, --help      	outputs the usage information
 -t, --type <type>	the type of element you are scaffolding
```

For type you can use: `component`, `config`, `lint-files`.

#### Examples

```
$ iceberg make visualization -t component
$ iceberg make --type lint-files
$ iceberg make -t config
```

## Build

It builds the JS bundle ready for production

```
$ iceberg build
```

## Remove

Remove iceberg from the project.

```
$ iceberg remove
```

## License

MIT
