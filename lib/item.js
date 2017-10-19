'use strict'

const is = require('@sindresorhus/is')

const validateReference = require('./reference')
const validTypes = require('./valid-types')

const validateItem = (test, item, name = 'item') => {
  test.ok(is.object(item) && !is.array(item), name + ' must be an object')
  test.equal(typeof item.type, 'string', name + '.type must be a string')
  test.ok(validTypes.includes(item.type), name + '.type is invalid')
  validateReference(test, item.id, name + '.id')
}

module.exports = validateItem
