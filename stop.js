'use strict'

const is = require('@sindresorhus/is')

const validateItem = require('./lib/item')
const validateReference = require('./lib/reference')
const validateCoordinates = require('./lib/coordinates')

const validateStop = (test, stop, name = 'stop') => {
  validateItem(test, stop, name)

  test.equal(stop.type, 'stop', name + '.type must be `stop`')

  validateReference(test, stop.id, name + '.id')

  // todo: what if stop.station is a station object?
  validateReference(test, stop.station, name + '.station')

  test.equal(typeof stop.name, 'string', name + '.name must be a string')
  test.ok(stop.name.length > 0, name + '.name can\'t be empty')

  if (!is.null(stop.coordinates) && !is.undefined(stop.coordinates)) {
    validateCoordinates(test, stop.coordinates, name + '.coordinates')
  }
}

module.exports = validateStop
