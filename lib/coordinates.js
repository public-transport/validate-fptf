'use strict'

const a = require('assert')
const is = require('@sindresorhus/is')
const isValidWGS84 = require('is-coordinates')

const validateCoordinates = (coords, name = 'coordinates') => {
  a.ok(is.object(coords) && !is.array(coords), name + ' must be an object')

  a.strictEqual(typeof coords.latitude, 'number', name + '.latitude must be a number')
  a.strictEqual(typeof coords.longitude, 'number', name + '.longitude must be a number')

  if ('altitude' in coords) {
    a.strictEqual(typeof coords.altitude, 'number', name + '.altitude must be a number')
  }

  a.ok(isValidWGS84([
    coords.longitude,
    coords.latitude,
  ], {validate: true}), name + ' must be valid WGS 84 coordinates')
}

module.exports = validateCoordinates
