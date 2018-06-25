'use strict'

const is = require('@sindresorhus/is')
const a = require('assert')

const anyOf = require('./lib/any-of')

const isField = (obj, f) => !is.null(obj[f]) && !is.undefined(obj[f])

const validateStopover = (val, st, name = 'stopover') => {
  val.item(val, st, name, false)

  a.strictEqual(st.type, 'stopover', name + '.type must be `stopover`')

  anyOf(['station', 'stop'], val, st.stop, name + '.stop')

  if (!is.null(st.departure)) {
    val.date(val, st.departure, name + '.departure')
  }
  if (!is.null(st.arrival)) {
    val.date(val, st.arrival, name + '.arrival')
  }

  if (isField(st, 'departurePlatform')) {
    a.strictEqual(typeof st.departurePlatform, 'string', name + '.departurePlatform must be a string')
    a.ok(st.departurePlatform.length > 0, name + '.departurePlatform can\'t be empty')
  }
  if (isField(st, 'arrivalPlatform')) {
    a.strictEqual(typeof st.arrivalPlatform, 'string', name + '.arrivalPlatform must be a string')
    a.ok(st.arrivalPlatform.length > 0, name + '.arrivalPlatform can\'t be empty')
  }

  if (isField(st, 'departureDelay')) {
    a.strictEqual(typeof st.departureDelay, 'number', name + '.departureDelay must be a number')
    a.ok(st.departureDelay >= 0, name + '.departureDelay must be >= 0')
  }
  if (isField(st, 'arrivalDelay')) {
    a.strictEqual(typeof st.arrivalDelay, 'number', name + '.arrivalDelay must be a number')
    a.ok(st.arrivalDelay >= 0, name + '.arrivalDelay must be >= 0')
  }
}

module.exports = validateStopover
