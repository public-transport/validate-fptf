'use strict'

const a = require('assert')
const is = require('@sindresorhus/is')

const anyOf = require('./lib/any-of')

// The threshold above which we can safely consider a sequence
// as too long, cruise ship routes taken into account.
const twoWeeks = 2 * 7 * 24 * 60 * 60

const isField = (obj, f) => {
  return !is.null(obj[f]) && !is.undefined(obj[f])
}

const validateSequenceItems = (_name = 'schedule.sequence') => {
  const validateSequenceItem = (sItem, i, sItems) => {
    const lastI = sItems.length - 1
    const name = _name + '[' + i + ']'

    a.ok(is.object(sItem) && !is.array(sItem), name + ' must be an object')

    const hasDeparture = isField(sItem, 'departure') || i !== lastI
    if (hasDeparture) {
      a.strictEqual(typeof sItem.departure, 'number', name + '.departure must be a number')
    }
    if (i === 0) {
      a.strictEqual(sItem.departure, 0, name + '.departure must be `0`')
    } else if (i !== lastI) {
      a.ok(sItem.departure < twoWeeks, name + '.departure must b a relative value')
    }

    if (isField(sItem, 'arrival') || i === lastI) {
      a.strictEqual(typeof sItem.arrival, 'number', name + '.arrival must be a number')
      a.ok(sItem.arrival < twoWeeks, name + '.arrival must b a relative value')

      if (hasDeparture) {
        a.ok(sItem.arrival < sItem.departure, name + '.arrival must be < ' + name + '.departure')
      }
    }
  }
  return validateSequenceItem
}

const validateSchedule = (val, schedule, name = 'schedule') => {
  val.item(val, schedule, name)

  a.strictEqual(schedule.type, 'schedule', name + '.type must be `schedule`')

  val.ref(val, schedule.id, name + '.id')

  anyOf(['route', 'ref'], val, schedule.route, name + '.route')

  if (isField(schedule, 'line')) {
    anyOf(['line', 'ref'], val, schedule.line, name + '.line')
  }

  val.mode(val, schedule.mode, name + '.mode')
  if (!is.undefined(schedule.subMode)) {
    a.fail(name + '.subMode is reserved and should not be used for now')
  }

  a.ok(Array.isArray(schedule.sequence), name + '.sequence must be an array')
  a.ok(schedule.sequence.length > 0, name + '.sequence can\'t be empty')
  schedule.sequence.forEach(validateSequenceItems(name + '.sequence'))
  // todo: check if sorted correctly

  a.ok(is.object(schedule.starts) && !is.array(schedule.starts), name + '.starts must be an object')
  a.ok(Object.keys(schedule.starts).length > 0, name + '.starts can\'t be empty')
  for (const key of Object.keys(schedule.starts)) {
    const _name = `${name}.starts[${key}]`
    val.ref(val, key, _name)
    val.date(val, schedule.starts[key], _name)
  }
}

module.exports = validateSchedule
