'use strict'

const a = require('assert')
const is = require('@sindresorhus/is')

const anyOf = require('./lib/any-of')

const validateStation = (val, station, name = 'station') => {
  val.item(val, station, name)

  a.strictEqual(station.type, 'station', name + '.type must be `station`')

  val.ref(val, station.id, name + '.id')

  a.strictEqual(typeof station.name, 'string', name + '.name must be a string')
  a.ok(station.name.length > 0, name + '.name can\'t be empty')

  if (!is.null(station.location) && !is.undefined(station.location)) {
    val.location(val, station.location, name + '.location')
  }

  if (!is.null(station.coordinates) && !is.undefined(station.coordinates)) {
    a.fail(name + '.coordinates should be renamed to ' + name + '.location')
  }

  if (!is.null(station.regions) && !is.undefined(station.regions)) {
    a.ok(Array.isArray(station.regions), name + '.regions must be an array')
    for (let i = 0; i < station.regions.length; i++) {
      const r = station.regions[i]
      anyOf(['region', 'ref'], val, r, name + `.regions[${i}]`)
    }
  }
}

module.exports = validateStation
