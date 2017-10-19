'use strict'

const a = require('assert')
const is = require('@sindresorhus/is')

const validateItem = require('./lib/item')
const validateReference = require('./lib/reference')
const validateCoordinates = require('./lib/coordinates')

const validateStation = (station, name = 'station') => {
  validateItem(station, name)

  a.strictEqual(station.type, 'station', name + '.type must be `station`')

  validateReference(station.id, name + '.id')

  a.strictEqual(typeof station.name, 'string', name + '.name must be a string')
  a.ok(station.name.length > 0, name + '.name can\'t be empty')

  if (!is.null(station.coordinates) && !is.undefined(station.coordinates)) {
    validateCoordinates(station.coordinates, name + '.coordinates')
  }

  if (!is.null(station.address) && !is.undefined(station.address)) {
    a.strictEqual(typeof station.address, 'string', name + '.address must be a string')
    a.ok(station.address.length > 0, name + '.address can\'t be empty')
  }

  if (!is.null(station.regions) && !is.undefined(station.regions)) {
    a.ok(Array.isArray(station.regions), name + '.regions must be an array')
    for (let i = 0; i < station.regions; i++) {
      const r = region.stations[i]
      // todo: what if r is a region object?
      validateReference(r, name + `regions[${i}]`)
    }
  }
}

module.exports = validateStation
