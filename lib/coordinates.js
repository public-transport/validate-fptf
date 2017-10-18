'use strict'

const is = require('is')

const validateCoordinates = (test, coords, name = 'coordinates') => {
  test.ok(is.object(coords) && !is.array(coords), name + ' must be an object')

  test.equal(typeof coords.latitude, 'number', name + '.latitude must be a number')
  test.equal(typeof coords.longitude, 'number', name + '.longitude must be a number')

  if ('altitude' in coords) {
	test.equal(typeof coords.altitude, 'number', name + '.altitude must be a number')
  }

  // todo: check if these numbers are more or less resonable
}

module.exports = validateCoordinates
