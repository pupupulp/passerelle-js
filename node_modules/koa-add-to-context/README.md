# koa-add-to-context

[![npm version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![coverage status][coveralls-image]][coveralls-url]

Koa middleware to add all enumerable keys to the context of each request

## Installation

```sh
$ npm i koa-add-to-context
```

## Usage

```js
var addToContext = require('koa-add-to-context')
var koa = require('koa')

var app = koa()
app.use(addToContext({ foo: 'foo' }))
app.use(function * () {
  this.body = this.foo
})
```

## API

```js
addToContext(obj: Object): GeneratorFunction
```

## Test

```sh
npm test
```

## License

MIT

[npm-image]: https://img.shields.io/npm/v/koa-add-to-context.svg
[npm-url]: https://npmjs.org/package/koa-add-to-context
[travis-image]: https://travis-ci.org/cesarandreu/koa-add-to-context.svg?branch=master
[travis-url]: https://travis-ci.org/cesarandreu/koa-add-to-context
[coveralls-image]: https://coveralls.io/repos/cesarandreu/koa-add-to-context/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/cesarandreu/koa-add-to-context?branch=master
