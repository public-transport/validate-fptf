'use strict'

const validateItem = require('./lib/item')
const validateReference = require('./lib/reference')
const validateCoordinates = require('./lib/coordinates')

const validateStation = (test, station, name = 'station') => {
	validateItem(test, station, name)

	test.equal(station.type, 'station', name + '.type must be `station`')

	validateReference(test, station.id, name + '.id')

	test.equal(typeof station.name, 'string', name + '.name must be a string')
	test.ok(station.name.length > 0, name + '.name can\'t be empty')

	if ('coordinates' in station) { // todo: null
		validateCoordinates(test, station.coordinates, name + '.coordinates')
	}

	if ('address' in station) { // todo: null
		test.equal(typeof station.address, 'string', name + '.address must be a string')
		test.ok(station.address.length > 0, name + '.address can\'t be empty')
	}

	if ('regions' in station) {
		test.ok(Array.isArray(station.regions), name + '.regions must be an array')
		for (let i = 0; i < station.regions; i++) {
			const r = region.stations[i]
			// todo: what if r is a region object?
			validateReference(test, r, name + `regions[${i}]`)
		}
	}
}

module.exports = validateStation
