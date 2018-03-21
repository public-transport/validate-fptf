'use strict'

const a = require('assert')
const is = require('@sindresorhus/is')

const validateItem = require('./lib/item')
const validateReference = require('./lib/reference')

const location = require('./location')
const station = require('./station')
const stop = require('./stop')
const line = require('./line')
const region = require('./region')
const route = require('./route')
const schedule = require('./schedule')
const operator = require('./operator')
const journey = require('./journey')

const validTypes = require('./lib/valid-types')

const defaultValidators = {
  location,
  station,
  stop,
  line,
  region,
  route,
  schedule,
  operator,
  journey
}

const createRecurse = (validators) => {
  const recurse = (allowedTypes, item, name = 'item') => {
    const typesStr = allowedTypes.join(', ')

    if (is.object(item) && !is.array(item)) {
      validateItem(item, name)

      a.ok(allowedTypes.includes(item.type), name + '.type must be any of' + typesStr)

      const validator = validators[item.type]
      validator(recurse, item, name)
    } else {
      validateReference(item, name)
    }
  }
  return recurse
}

const validate = (item, validators = defaultValidators) => {
  const recurse = createRecurse(validators)
  return recurse(validTypes, item, 'obj')
}

validate.defaultValidators = defaultValidators
validate.createRecurse = createRecurse
validate.recurse = createRecurse(defaultValidators)
module.exports = validate
