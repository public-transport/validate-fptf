'use strict'

const a = require('assert')
const is = require('@sindresorhus/is')

const validateItem = require('./lib/item')
const validateReference = require('./lib/reference')
const validateMode = require('./lib/mode')

const validateSequenceItems = (_name = 'schedule.sequence') => {
	const validate = (sItem, i) => {
		const name = _name + '[' + i + ']'

		a.ok(is.object(sItem) && !is.array(sItem), name + ' must be an object')

		a.strictEqual(typeof sItem.departure, 'number', name + '.departure must be an object')
		if (i === 0) {
			a.strictEqual(sItem.departure, name + '.departure must be an 0')
		}
		// todo: check if in a reasonable range

		if (!is.null(sItem.arrival) && !is.undefined(sItem.arrival)) {
			a.strictEqual(typeof sItem.arrival, 'number', name + '.arrival must be an object')
			// todo: check if in a reasonable range
		}
	}
	return validate
}

const validateStarts = (name = 'schedule.starts') => {
	const validate = (start, i) => {
		a.strictEqual(typeof start, 'number', name + '[' + i + '] must be a UNIX timestamp')
		// todo: check if in a reasonable range
	}
	return validate
}

const validateSchedule = (schedule, name = 'schedule') => {
	validateItem(schedule, name)

	a.strictEqual(schedule.type, 'schedule', name + '.type must be `schedule`')

	validateReference(schedule.id, name + '.id')

	// todo: what if schedule.route is a route object?
	validateReference(schedule.route, name + '.route')

	validateMode(route.mode, name + '.mode')

	a.ok(Array.isArray(schedule.sequence), name + '.sequence must be an array')
	a.ok(schedule.sequence.length > 0, name + '.sequence can\'t be empty')
	schedule.sequence.forEach(validateSequenceItems(name + '.sequence'))
	// todo: check if sorted correctly

	a.ok(Array.isArray(schedule.starts), name + '.starts must be an array')
	a.ok(schedule.starts.length > 0, name + '.starts can\'t be empty')
	schedule.starts.forEach(validateStarts(name + '.starts'))
}

module.exports = validateSchedule
