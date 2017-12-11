'use strict'

const a = require('assert')
const is = require('@sindresorhus/is')

const validateItem = require('./lib/item')
const validateMode = require('./lib/mode')
const validateReference = require('./lib/reference')

const validateLine = (valItem, line, name = 'line') => {
  validateItem(line, name)

  a.strictEqual(line.type, 'line', name + '.type must be `line`')

  validateReference(line.id, name + '.id')

  a.strictEqual(typeof line.name, 'string', name + '.name must be a string')
  a.ok(line.name.length > 0, name + '.name can\'t be empty')

  validateMode(line.mode, name + '.mode')
  if (!is.undefined(line.subMode)) {
    a.fail(name + '.subMode is reserved an should not be used for now')
  }

  // todo: routes

  if (!is.null(line.operator) && !is.undefined(line.operator)) {
    valItem(['operator'], line.operator, name + '.operator')
  }
}

module.exports = validateLine
