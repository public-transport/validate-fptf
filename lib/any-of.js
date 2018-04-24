'use strict'

const a = require('assert')

const anyOf = (allowedTypes, val, item, name = 'item') => {
  if (item && item.type !== undefined) {
    a.strictEqual(typeof item.type, 'string', name + '.type must be a string')
    a.ok(item.type, name + '.type must not be empty')

    const msg = name + '.type must be any of ' + allowedTypes.join(', ')
    a.ok(allowedTypes.includes(item.type), msg)

    val[item.type](val, item, name)
  } else {
    val.ref(val, item, name)
  }
}

module.exports = anyOf
