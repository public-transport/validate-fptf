'use strict'

const a = require('assert')
const slugg = require('slugg')

const isUrlSafe = s => s === slugg(s, {toLowerCase: false})

const validateReference = (ref, name = 'reference') => {
  a.strictEqual(typeof ref, 'string', name + ' must be a string')
  a.ok(ref.length > 0, 'string', name + ' can\'t be empty')
  a.ok(isUrlSafe(ref), name + ' must be url-safe')
}

module.exports = validateReference
