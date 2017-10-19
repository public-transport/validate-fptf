'use strict'

const is = require('@sindresorhus/is')

const validateItem = require('./lib/item')
const validateReference = require('./lib/reference')
const validateMode = require('./lib/mode')

const validateSequenceItems = (test, _name = 'schedule.sequence') => {
	const validate = (sItem, i) => {
		const name = _name + '[' + i + ']'

		test.ok(is.object(sItem) && !is.array(sItem), name + ' must be an object')

		test.equal(typeof sItem.departure, 'number', name + '.departure must be an object')
		if (i === 0) {
			test.equal(sItem.departure, name + '.departure must be an 0')
		}
		// todo: check if in a reasonable range

		if (!is.null(sItem.arrival) && !is.undefined(sItem.arrival)) {
			test.equal(typeof sItem.arrival, 'number', name + '.arrival must be an object')
			// todo: check if in a reasonable range
		}
	}
	return validate
}

const validateStarts = (test, name = 'schedule.starts') => {
	const validate = (start, i) => {
		test.equal(typeof start, 'number', name + '[' + i + '] must be a UNIX timestamp')
		// todo: check if in a reasonable range
	}
	return validate
}

const validateSchedule = (test, schedule, name = 'schedule') => {
	validateItem(test, schedule, name)

	test.equal(schedule.type, 'schedule', name + '.type must be `schedule`')

	validateReference(test, schedule.id, name + '.id')

	// todo: what if schedule.route is a route object?
	validateReference(test, schedule.route, name + '.route')

	validateMode(test, route.mode, name + '.mode')

	test.ok(Array.isArray(schedule.sequence), name + '.sequence must be an array')
	test.ok(schedule.sequence.length > 0, name + '.sequence can\'t be empty')
	schedule.sequence.forEach(validateSequenceItems(test, name + '.sequence'))
	// todo: check if sorted correctly

	test.ok(Array.isArray(schedule.starts), name + '.starts must be an array')
	test.ok(schedule.starts.length > 0, name + '.starts can\'t be empty')
	schedule.starts.forEach(validateStarts(test, name + '.starts'))
}

module.exports = validateSchedule
