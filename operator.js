'use strict'

const validateItem = require('./lib/item')
const validateReference = require('./lib/reference')

const validateOperator = (test, op, name = 'operator') => {
	validateItem(test, op, name)

	test.equal(op.type, 'operator', name + '.type must be `operator`')

	validateReference(test, op.id, name + '.id')

	test.equal(typeof op.name, 'string', name + '.name must be a string')
	test.ok(op.name.length > 0, name + '.name can\'t be empty')
}

module.exports = validateOperator
