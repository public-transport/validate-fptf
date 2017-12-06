'use strict'

const a = require('assert')
const is = require('@sindresorhus/is')

const validateItem = require('./lib/item')
const validateReference = require('./lib/reference')
const validateLocation = require('./location')

const validateStop = (valItem, stop, name = 'stop') => {
  validateItem(stop, name)

  a.strictEqual(stop.type, 'stop', name + '.type must be `stop`')

  validateReference(stop.id, name + '.id')

  valItem(['station'], stop.station, name + '.station')

  a.strictEqual(typeof stop.name, 'string', name + '.name must be a string')
  a.ok(stop.name.length > 0, name + '.name can\'t be empty')

  if (!is.null(stop.location) && !is.undefined(stop.location)) {
    validateLocation(valItem, stop.location, name + '.location')
  }

  if (!is.null(stop.coordinates) && !is.undefined(stop.coordinates)) {
    a.fail(name + '.coordinates should be renamed to ' + name + '.location')
  }
}

module.exports = validateStop
