'use strict'

const a = require('assert')

const validateItem = require('./lib/item')
const validateReference = require('./lib/reference')

const validateRegion = (region, name = 'region') => {
	validateItem(region, name)

	a.strictEqual(region.type, 'region', name + '.type must be `region`')

	validateReference(region.id, name + '.id')

	a.strictEqual(typeof region.name, 'string', name + '.name must be a string')
	a.ok(region.name.length > 0, name + '.name can\'t be empty')

	a.ok(Array.isArray(region.stations), name + '.stations must be an array')
	for (let i = 0; i < region.stations; i++) {
		const s = region.stations[i]
		// todo: what if s is a station object?
		validateReference(s, name + `stations[${i}]`)
	}
}

module.exports = validateRegion
