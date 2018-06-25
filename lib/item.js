'use strict'

const a = require('assert')
const is = require('@sindresorhus/is')

const validTypes = [
  'location',
  'station',
  'stop',
  'region',
  'line',
  'route',
  'schedule',
  'operator',
  'stopover',
  'journey'
]

const validateItem = (val, item, name = 'item', withId = true) => {
  a.ok(is.object(item) && !is.array(item), name + ' must be an object')
  a.strictEqual(typeof item.type, 'string', name + '.type must be a string')
  a.ok(validTypes.includes(item.type), name + '.type is invalid')
  if (withId) val.ref(val, item.id, name + '.id')
}

module.exports = validateItem
