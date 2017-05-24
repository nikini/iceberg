# PA ServiceNow Tool

[![NPM Version](http://img.shields.io/npm/v/pasnow.svg?style=flat)](https://www.npmjs.org/package/pasnow)
[![NPM Downloads](https://img.shields.io/npm/dm/pasnow.svg?style=flat)](https://www.npmjs.org/package/pasnow)

This tool has [webpack](https://github.com/webpack/webpack), [karma](https://github.com/karma-runner/karma) and other technologies built in to help you bundle and test your angular module

## Installation

You should install it globally first:

```
$ npm install pasnow -g
```

and then run, in your project folder:

```
$ pasnow init
```

## Watch

The watch starts the webpack watch, karma watch and the resources copy. You can choose to exclude: `cache`, `maven-compile`, `resources`, `webpack`, `karma`, `livereload`.

```
$ pasnow watch
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
$ pasnow watch --e karma,webpack
$ pasnow watch --exclude resources,cache,maven-compile
$ pasnow watch -s --silent
```

## Run

The run command starts a task, like: `cache`, `maven-compile`, `webpack`, `karma`, `flow-check`.

```
$ pasnow run <package>
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
$ pasnow run karma --silent
$ pasnow run webpack
$ pasnow run cache --host localhost --port 8081
```

## Make

A tool to scaffold components, configs or linting configs.

```
$ pasnow make [name] [options]
```

The options for the make are:

```
 -h, --help      	outputs the usage information
 -t, --type <type>	the type of element you are scaffolding
```

For type you can use: `component`, `config`, `lint-files`.

#### Examples

```
$ pasnow make visualization -t component
$ pasnow make --type lint-files
$ pasnow make -t config
```

## Build

It builds the JS bundle ready for production

```
$ pasnow build
```

## Remove

Remove pasnow from the project.

```
$ pasnow remove
```

## License

MIT
