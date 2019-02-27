/**
 * Middleware to add all enumerable keys to the context of each request
 * @param {Object} obj Object whose enumerable keys you want to add to the context
 * @returns {GeneratorFunction} addToContextMiddleware
 */
module.exports = function addToContext (obj) {
  if (!obj || typeof obj !== 'object') {
    throw new TypeError('Expected obj of type Object')
  }

  return function * addToContextMiddleware (next) {
    for (var prop in obj) {
      this[prop] = obj[prop]
    }
    yield next
  }
}
