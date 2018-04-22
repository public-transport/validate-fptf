'use strict'

const a = require('assert')

const validateOperator = (val, op, name = 'operator') => {
  val.item(val, op, name)

  a.strictEqual(op.type, 'operator', name + '.type must be `operator`')

  val.ref(val, op.id, name + '.id')

  a.strictEqual(typeof op.name, 'string', name + '.name must be a string')
  a.ok(op.name.length > 0, name + '.name can\'t be empty')
}

module.exports = validateOperator
