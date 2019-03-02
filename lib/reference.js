'use strict'

const a = require('assert')

const validateReference = (val, ref, name = 'reference') => {
  a.strictEqual(typeof ref, 'string', name + ' must be a string')
  a.ok(ref.length > 0, 'string', name + ' can\'t be empty')
}

module.exports = validateReference
