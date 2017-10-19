'use strict'

const a = require('assert')

const validateItem = require('./lib/item')
const validateReference = require('./lib/reference')
const validateMode = require('./lib/mode')

const validateRoute = (valItem, route, name = 'route') => {
  validateItem(route, name)

  a.strictEqual(route.type, 'route', name + '.type must be `route`')

  validateReference(route.id, name + '.id')

  valItem(['line'], route.line, name + '.line')

  validateMode(route.mode, name + '.mode')

  a.ok(Array.isArray(route.stops), name + '.stops must be an array')
  for (let i = 0; i < route.stops; i++) {
    const s = route.stops[i]
    valItem(['stop'], s, name + `stops[${i}]`)
  }
}

module.exports = validateRoute
