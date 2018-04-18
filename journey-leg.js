'use strict'

const is = require('@sindresorhus/is')
const a = require('assert')

const validateDate = require('./lib/date')
const validateMode = require('./lib/mode')

const isField = (obj, f) => {
  return !is.null(obj[f]) && !is.undefined(obj[f])
}

const validateJourneyLeg = (valItem, leg, name = 'journeyLeg') => {
  a.ok(is.object(leg) && !is.array(leg), name + ' must be an object')

  valItem(['station', 'stop', 'location'], leg.origin, name + '.origin')

  valItem(['station', 'stop', 'location'], leg.destination, name + '.destination')

  validateDate(leg.departure, name + '.departure')
  validateDate(leg.arrival, name + '.arrival')

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

  valItem(['schedule'], leg.schedule, name + '.schedule')

  if (isField(leg, 'mode')) {
    validateMode(leg.mode, name + '.mode')
  }
  if (!is.undefined(leg.subMode)) {
    a.fail(name + '.subMode is reserved and should not be used for now')
  }

  if (isField(leg, 'public')) {
    a.strictEqual(typeof leg.public, 'boolean', name + '.public must be a boolean')
  }

  valItem(['operator'], leg.operator, name + '.operator')
}

module.exports = validateJourneyLeg
