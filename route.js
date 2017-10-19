'use strict'

const a = require('assert')

const validateItem = require('./lib/item')
const validateReference = require('./lib/reference')
const validateMode = require('./lib/mode')

const validateRoute = (route, name = 'route') => {
  validateItem(route, name)

  a.strictEqual(route.type, 'route', name + '.type must be `route`')

  validateReference(route.id, name + '.id')

  // todo: what if route.line is a line object?
  validateReference(route.line, name + '.line')

  validateMode(route.mode, name + '.mode')

  a.ok(Array.isArray(route.stops), name + '.stops must be an array')
  for (let i = 0; i < route.stops; i++) {
    const s = route.stops[i]
    // todo: what if s is a stop object?
    validateReference(s, name + `stops[${i}]`)
  }
}

module.exports = validateRoute
