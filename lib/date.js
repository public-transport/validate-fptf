'use strict'

const validateDate = (test, date, name = 'a date') => {
  test.equal(typeof date, 'string', name + ' must be a string')

  const d = new Date(date)
  test.notOk(Number.isNaN(+d), name + ' must be a valid ISO 8601 string')

  // todo: check if date is more or less resonable
}

module.exports = validateDate
