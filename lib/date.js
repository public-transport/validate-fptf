'use strict'

const a = require('assert')

const year2200 = new Date('2200-01-01T00:00:00Z')

const validateDate = (date, name = 'a date') => {
  a.strictEqual(typeof date, 'string', name + ' must be a string')

  const d = new Date(date)
  a.ok(!Number.isNaN(+d), name + ' must be a valid ISO 8601 string')

  a.ok(d < year2200, name + ' seems to be too far in the future')
}

module.exports = validateDate
