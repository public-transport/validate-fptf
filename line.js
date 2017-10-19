'use strict'

const is = require('@sindresorhus/is')

const validateItem = require('./lib/item')
const validateMode = require('./lib/mode')
const validateReference = require('./lib/reference')

const validateLine = (test, line, name = 'line') => {
  validateItem(test, line, name)

  test.equal(line.type, 'line', name + '.type must be `line`')

  test.equal(typeof line.name, 'string', name + '.name must be a string')
  test.ok(line.name.length > 0, name + '.name can\'t be empty')

  validateMode(test, line.mode, name + '.mode')

  // todo: routes

  if (!is.null(line.operator) && !is.undefined(line.operator)) {
	// todo: what if line.operator is a operator object?
	validateReference(test, line.operator, name + '.operator')
  }
}

module.exports = validateLine
