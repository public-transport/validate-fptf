'use strict'

const a = require('assert')
const is = require('@sindresorhus/is')

const validateItem = require('./lib/item')
const validateReference = require('./lib/reference')
const validateMode = require('./lib/mode')

// The threshold above which we can safely consider a sequence
// as too long, cruise ship routes taken into account.
const twoWeeks = 2 * 7 * 24 * 60 * 60

const validateSequenceItems = (_name = 'schedule.sequence') => {
  const validateSequenceItem = (sItem, i, sItems) => {
    const lastI = sItems.length - 1
    const name = _name + '[' + i + ']'

    a.ok(is.object(sItem) && !is.array(sItem), name + ' must be an object')

    a.strictEqual(typeof sItem.departure, 'number', name + '.departure must be a number')
    if (i === 0) {
      a.strictEqual(sItem.departure, 0, name + '.departure must be `0`')
    } else {
      a.ok(sItem.departure < twoWeeks, name + '.departure must b a relative value')
    }

    if (!is.null(sItem.arrival) && !is.undefined(sItem.arrival)) {
      a.strictEqual(typeof sItem.arrival, 'number', name + '.arrival must be a number')
      a.ok(sItem.arrival < twoWeeks, name + '.arrival must b a relative value')
    }
  }
  return validateSequenceItem
}

const validateStarts = (name = 'schedule.starts') => {
  const validateStart = (start, i) => {
    a.strictEqual(typeof start, 'number', name + '[' + i + '] must be a UNIX timestamp')
    // todo: check if in a reasonable range
  }
  return validateStart
}

const validateSchedule = (valItem, schedule, name = 'schedule') => {
  validateItem(schedule, name)

  a.strictEqual(schedule.type, 'schedule', name + '.type must be `schedule`')

  validateReference(schedule.id, name + '.id')

  valItem(['route'], schedule.route, name + '.route')

  validateMode(schedule.mode, name + '.mode')

  a.ok(Array.isArray(schedule.sequence), name + '.sequence must be an array')
  a.ok(schedule.sequence.length > 0, name + '.sequence can\'t be empty')
  schedule.sequence.forEach(validateSequenceItems(name + '.sequence'))
  // todo: check if sorted correctly

  a.ok(Array.isArray(schedule.starts), name + '.starts must be an array')
  a.ok(schedule.starts.length > 0, name + '.starts can\'t be empty')
  schedule.starts.forEach(validateStarts(name + '.starts'))
}

module.exports = validateSchedule
