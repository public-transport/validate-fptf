'use strict'

const validateItem = require('./lib/item')
const validateReference = require('./lib/reference')
const validateMode = require('./lib/mode')

const validateRoute = (test, route, name = 'route') => {
	validateItem(test, route, name)

	test.equal(route.type, 'route', name + '.type must be `route`')

	validateReference(test, route.id, name + '.id')

	// todo: what if route.line is a line object?
	validateReference(test, route.line, name + '.line')

	validateMode(test, route.mode, name + '.mode')

	test.ok(Array.isArray(route.stops), name + '.stops must be an array')
	for (let i = 0; i < route.stops; i++) {
		const s = route.stops[i]
		// todo: what if s is a stop object?
		validateReference(test, s, name + `stops[${i}]`)
	}
}

module.exports = validateRoute
