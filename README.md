# Iceberg Tool

[![NPM Version](http://img.shields.io/npm/v/iceberg-packer.svg?style=flat)](https://www.npmjs.org/package/iceberg-packer)
[![NPM Downloads](https://img.shields.io/npm/dm/iceberg-packer.svg?style=flat)](https://www.npmjs.org/package/iceberg-packer)

This tool has [webpack](https://github.com/webpack/webpack), [jest](https://facebook.github.io/jest/) and other technologies built in to help you bundle and test your React modules

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

The watch starts the webpack watch, jest watch and the resources copy. You can choose to exclude: `cache`, `maven-compile`, `resources`, `webpack`, `jest`, `livereload`, `dev-server`.

```
$ iceberg watch [bundle]
```

The options for the watch are:

```
 -h,  --help                outputs the usage information
 -e,  --exclude <packages>  what packages to exclude (separated by comma)
 -s,  --single              run once and then exit (webpack and jest)
 --silent                   this flag will hide OS notifications
 --host <hostname>          hostname for the cache clear
 --port <port>              port for the cache clea
 --dev-port <dev-port>      port for the webpack-dev-server
 --prod                     production environment (builds just like for production without the split)
```

#### Examples

```
$ iceberg watch --e jest,webpack
$ iceberg watch --exclude resources,cache,maven-compile
$ iceberg watch -s --silent
$ iceberg watch --prod
```

## Run

The run command starts a task, like: `cache`, `maven-compile`, `webpack`, `jest`, `flow-check`, `eslint`.

```
$ iceberg run <package>
```

The options for the run are:

```
 -h,  --help                outputs the usage information
 --silent                   this flag will hide OS notifications
 --host                     hostname for the cache clear
 --port                     port for the cache clear
 --fix                      this is only useful for eslint - fixes some linting errors
```

#### Examples

```
$ iceberg run jest --silent
$ iceberg run webpack
$ iceberg run cache --host localhost --port 8081
$ iceberg run eslint --fix
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

For type you can use: `component`, `prop-type`, `config`, `lint-files`.

#### Examples

```
$ iceberg make common/visualization -t component
$ iceberg make highcharts --type component
$ iceberg make --type lint-files
$ iceberg make -t config
$ iceberg make common/visualization/chart-options -t prop-type
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
