'use strict'

const is = require('@sindresorhus/is')
const isCurrencyCode = require('is-currency-code')

const validateDate = require('./lib/date')
const validateMode = require('./lib/mode')
const validateItem = require('./lib/item')
const validateReference = require('./lib/reference')

const isField = (obj, f) => {
	return !is.null(obj[f]) && !is.undefined(obj[f])
}

const validateLegs = (test, _name = 'schedule.legs') => {
	const validateLeg = (leg, i) => {
		const name = _name + '[' + i + ']'

		test.ok(is.object(leg) && !is.array(leg), name + ' must be an object')

		// todo: what if leg.origin is a station/stop/location object?
		validateReference(test, leg.origin, name + '.origin')

		// todo: what if leg.destination is a station/stop/location object?
		validateReference(test, leg.destination, name + '.destination')

		validateDate(test, leg.departure, name + '.departure')
		validateDate(test, leg.arrival, name + '.arrival')

		if (isField(leg, 'departurePlatform')) {
			test.equal(typeof leg.departurePlatform, 'string', name + '.departurePlatform must be a string')
			test.ok(leg.departurePlatform.length > 0, name + '.departurePlatform can\'t be empty')
		}
		if (isField(leg, 'arrivalPlatform')) {
			test.equal(typeof leg.arrivalPlatform, 'string', name + '.arrivalPlatform must be a string')
			test.ok(leg.arrivalPlatform.length > 0, name + '.arrivalPlatform can\'t be empty')
		}

		// todo: what if leg.schedule is a schedule object?
		validateReference(test, leg.schedule, name + '.schedule')

		validateMode(test, leg.mode, name + '.mode')

		if (isField(leg, 'public')) {
			test.equal(typeof leg.public, 'boolean', name + '.public must be a boolean')
		}

		// todo: what if leg.operator is a operator object?
		validateReference(test, leg.operator, name + '.operator')
	}
	return validate
}

const validateJourney = (test, journey, name = 'journey') => {
	validateItem(test, journey, name)

	test.equal(journey.type, 'journey', name + '.type must be `journey`')

	validateReference(test, journey.id, name + '.id')

	test.ok(Array.isArray(journey.legs), name + '.legs must be an array')
	test.ok(journey.legs.length > 0, name + '.legs can\'t be empty')
	journey.legs.forEach(validateLegs(test, name + '.legs'))
	// todo: check if sorted correctly

	if (isField(journey, 'price')) {
		test.ok(is.object(journey.price) && !is.array(journey.price), name + '.price must be an object')
		test.equal(typeof leg.amount, 'number', name + '.amount must be a number')
		test.equal(typeof leg.currency, 'string', name + '.currency must be a string')
		test.ok(isCurrencyCode(leg.currency), name + '.currency must be a valid ISO 4217 currency code')
	}
}

module.exports = validateJourney
