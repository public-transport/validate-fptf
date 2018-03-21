'use strict'

const a = require('assert')
const is = require('@sindresorhus/is')

const validateItem = require('./lib/item')
const validateReference = require('./lib/reference')
const validateLocation = require('./location')

const validateStation = (valItem, station, name = 'station') => {
  validateItem(station, name)

  a.strictEqual(station.type, 'station', name + '.type must be `station`')

  validateReference(station.id, name + '.id')

  a.strictEqual(typeof station.name, 'string', name + '.name must be a string')
  a.ok(station.name.length > 0, name + '.name can\'t be empty')

  if (!is.null(station.location) && !is.undefined(station.location)) {
    validateLocation(valItem, station.location, name + '.location')
  }

  if (!is.null(station.coordinates) && !is.undefined(station.coordinates)) {
    a.fail(name + '.coordinates should be renamed to ' + name + '.location')
  }

  if (!is.null(station.regions) && !is.undefined(station.regions)) {
    a.ok(Array.isArray(station.regions), name + '.regions must be an array')
    for (let i = 0; i < station.regions.length; i++) {
      const r = station.regions[i]
      valItem(['region'], r, name + `.regions[${i}]`)
    }
  }
}

module.exports = validateStation
