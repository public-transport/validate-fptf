'use strict'

const a = require('assert')
const is = require('@sindresorhus/is')

const validateRoute = (val, route, name = 'route') => {
  val.item(val, route, name)

  a.strictEqual(route.type, 'route', name + '.type must be `route`')

  val.ref(val, route.id, name + '.id')

  val.line(val, route.line, name + '.line')

  if (!is.null(route.mode) && !is.undefined(route.mode)) {
    val.mode(val, route.mode, name + '.mode')
  }
  if (!is.undefined(route.subMode)) {
    a.fail(name + '.subMode is reserved and should not be used for now')
  }

  a.ok(Array.isArray(route.stops), name + '.stops must be an array')
  for (let i = 0; i < route.stops; i++) {
    const s = route.stops[i]
    val.stop(val, s, name + `stops[${i}]`)
  }
}

module.exports = validateRoute
