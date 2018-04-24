'use strict'

const is = require('@sindresorhus/is')
const a = require('assert')

const anyOf = require('./lib/any-of')

const isField = (obj, f) => {
  return !is.null(obj[f]) && !is.undefined(obj[f])
}

const validateJourneyLeg = (val, leg, name = 'journeyLeg') => {
  a.ok(is.object(leg) && !is.array(leg), name + ' must be an object')

  anyOf([
    'station', 'stop', 'location'
  ], val, leg.origin, name + '.origin')

  anyOf([
    'station', 'stop', 'location'
  ], val, leg.destination, name + '.destination')

  val.date(val, leg.departure, name + '.departure')
  val.date(val, leg.arrival, name + '.arrival')

  if (isField(leg, 'departurePlatform')) {
    a.strictEqual(typeof leg.departurePlatform, 'string', name + '.departurePlatform must be a string')
    a.ok(leg.departurePlatform.length > 0, name + '.departurePlatform can\'t be empty')
  }
  if (isField(leg, 'arrivalPlatform')) {
    a.strictEqual(typeof leg.arrivalPlatform, 'string', name + '.arrivalPlatform must be a string')
    a.ok(leg.arrivalPlatform.length > 0, name + '.arrivalPlatform can\'t be empty')
  }

  if (isField(leg, 'departureDelay')) {
    a.strictEqual(typeof leg.departureDelay, 'number', name + '.departureDelay must be a number')
    a.ok(leg.departureDelay >= 0, name + '.departureDelay must be >= 0')
  }
  if (isField(leg, 'arrivalDelay')) {
    a.strictEqual(typeof leg.arrivalDelay, 'number', name + '.arrivalDelay must be a number')
    a.ok(leg.arrivalDelay >= 0, name + '.arrivalDelay must be >= 0')
  }

  anyOf(['schedule', 'ref'], val, leg.schedule, name + '.schedule')

  if (isField(leg, 'mode')) {
    val.mode(val, leg.mode, name + '.mode')
  }
  if (!is.undefined(leg.subMode)) {
    a.fail(name + '.subMode is reserved and should not be used for now')
  }

  if (isField(leg, 'public')) {
    a.strictEqual(typeof leg.public, 'boolean', name + '.public must be a boolean')
  }

  anyOf(['operator', 'ref'], val, leg.operator, name + '.operator')
}

module.exports = validateJourneyLeg
