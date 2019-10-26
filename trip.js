'use strict'

const is = require('@sindresorhus/is')
const a = require('assert')

const anyOf = require('./lib/any-of')

const isField = (obj, f) => {
  return !is.null(obj[f]) && !is.undefined(obj[f])
}

const validateTrip = (val, trip, name = 'trip') => {
  val.item(val, trip, name)

  a.strictEqual(trip.type, 'trip', name + '.type must be `trip`')

  val.ref(val, trip.id, name + '.id')

  if (isField(trip, 'line')) {
    anyOf(['line', 'ref'], val, trip.line, name + '.line')
  }

  if (isField(trip, 'route')) {
    anyOf(['route', 'ref'], val, trip.route, name + '.route')
  }

  if (isField(trip, 'schedule')) {
    anyOf(['schedule', 'ref'], val, trip.schedule, name + '.schedule')
  }

  if (is.string(trip.route) || isField(trip, 'mode')) {
    val.mode(val, trip.mode, name + '.mode')
  }
  if (!is.undefined(trip.subMode)) {
    a.fail(name + '.subMode is reserved and should not be used for now')
  }

  a.ok(is.array(trip.stopovers), name + '.stopovers must be an array')
  a.ok(trip.stopovers.length >= 2, name + '.stopovers must have >=2 items')
  for (let i = 0; i < trip.stopovers.length; i++) {
    val.stopover(val, trip.stopovers[i], `${name}.stopovers[${i}]`)
  }
}

module.exports = validateTrip
