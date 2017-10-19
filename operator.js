'use strict'

const a = require('assert')

const validateItem = require('./lib/item')
const validateReference = require('./lib/reference')

const validateOperator = (op, name = 'operator') => {
	validateItem(op, name)

	a.strictEqual(op.type, 'operator', name + '.type must be `operator`')

	validateReference(op.id, name + '.id')

	a.strictEqual(typeof op.name, 'string', name + '.name must be a string')
	a.ok(op.name.length > 0, name + '.name can\'t be empty')
}

module.exports = validateOperator
