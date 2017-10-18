'use strict'

const slugg = require('slugg')

const isUrlSafe = s => s === slugg(s, {toLowerCase: false})

const validateReference = (test, ref, name = 'reference') => {
  test.equal(typeof ref, 'string', name + ' must be a string')
  test.ok(ref.length > 0, 'string', name + ' can\'t be empty')
  test.ok(isUrlSafe(ref), name + ' must be url-safe')
}

module.exports = validateReference
