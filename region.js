'use strict'

const validateItem = require('./lib/item')
const validateReference = require('./lib/reference')

const validateRegion = (test, region, name = 'region') => {
	validateItem(test, region, name)

	test.equal(region.type, 'region', name + '.type must be `region`')

	validateReference(test, region.id, name + '.id')

	test.equal(typeof region.name, 'string', name + '.name must be a string')
	test.ok(region.name.length > 0, name + '.name can\'t be empty')

	test.ok(Array.isArray(region.stations), name + '.stations must be an array')
	for (let i = 0; i < region.stations; i++) {
		const s = region.stations[i]
		// todo: what if s is a station object?
		validateReference(test, s, name + `stations[${i}]`)
	}
}

module.exports = validateRegion
