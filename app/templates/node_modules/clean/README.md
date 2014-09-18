# clean [![NPM version](https://badge.fury.io/js/clean.png)](http://badge.fury.io/js/clean) [![Build Status](https://travis-ci.org/kaelzhang/node-clean.png?branch=master)](https://travis-ci.org/kaelzhang/node-clean) [![Dependency Status](https://gemnasium.com/kaelzhang/node-clean.png)](https://gemnasium.com/kaelzhang/node-clean)

Clean is small but powerful node.js module that parses and sanitize argv for node, supporting:

- fully extendable types
- shorthands
- validatiors
- setters

# Installation and Usage

```sh
npm install clean --save
```

```js
var clean = require('clean');
```

# Usage: clean(options)

## Argv Shorthands

We can define shorthands with the option `options.shorthands`.

```js
var shorthands = {
	c: 'cwd',
	n: 'no-recursive'
};

clean({
	shorthands: shorthands
}).argv(['node', 'xxx', '-c', 'abc', '-n']);
// The result is:
// {
//		cwd: 'abc',
//		recursive: false
// }
```

## Types

```js
clean({
	schema: {
		cwd: {
			type: require('path')
		},
		
		retry: {
			type: Boolean
		}
	}
}).parse(
	['node', 'xxx', '--cwd', 'abc', '--retry', 'false'], 
	function(err, results){
		console.log(results.cwd); // the `path.resolved()`d 'abc'
		console.log(results.retry === false); // is a boolean, not a string
	}
);
```

## Validators and Setters

Validators and setters of `clean` is implemented by `[checker](https://github.com/kaelzhang/node-checker)`, check the apis of `checker` for details.

You could check out the demo located at "example/clean.js". That is a very complicated situation of usage.

```sh
node example/clean.js --username guest
```


# Programatical Details

## constructor: clean(options)

- options `Object=`
  - schema `Object` schema to define the argv
  - offset `Number=` The offset from which the parser should start to parse. Optional. Default to `2`.
  - shorthands `Object=` The schema used to clean the given object or the parsred argv
  - parallel `Boolean=false` whether should check the argv in parallel, default to `false`

## options.schema

```js
name: {
  // If `required == true` and `--name` is not specified in argv, there will be an error
  required: true,
  validate: function(value){
    return /[a-z]/i.test(value);
  },
  set: function(value){
    return value.replace(/^[a-z]/, function(m){
      return m.toUpperCase();
    });
  }
}
```

- required `Boolean` 
- default `*` if `required` is `true`, this property will be ignored.
- validate `function(v, is_default)|Array` function for validation, or array of functions
- set `function(v, is_default)|Array` setter function, or array of functions.

There are three methods available for `this` object of validator and setter.

- `this.async()` returns function `done`, and turns the current validator or setter into an asynchronous method. We can also use `done` to define better error messages.
- `this.get(key)` could fetch the value of other properties.
- `this.set(key, value)` could set values of other properties.

## .argv(argv)

- argv `Array` `process.argv` or something like that.

Parses the argument vector, without cleaning the data.

Returns `Object` The parsed object with shorthand rules applied.

## .clean(data, callback)

- data `Object` The given data.
- callback `function(err, results)`

Cleans the given data according to the `schema`.

## .parse(argv, callback)

Parses argument vector (argv) or something like `process.argv`, and cleans the parsed data according to the `schema`.

This method is equivalent to `c.clean(c.argv(argv), callback)`.

# Advanced Section

## .registerType(type, typeDef)

Registers a custom type.

