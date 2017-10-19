'use strict'

const a = require('assert')

const validateDate = (date, name = 'a date') => {
  a.strictEqual(typeof date, 'string', name + ' must be a string')

  const d = new Date(date)
  a.ok(!Number.isNaN(+d), name + ' must be a valid ISO 8601 string')

  // todo: check if date is more or less resonable
}

module.exports = validateDate
