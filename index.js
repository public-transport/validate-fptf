'use strict'

const a = require('assert')
const is = require('@sindresorhus/is')

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
const journeyLeg = require('./journey-leg')

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
  journey,
  journeyLeg
}

const createRecurse = (validators) => {
  const recurse = (allowedTypes, item, name = 'item') => {
    if (is.string(allowedTypes) && is.function(validators[allowedTypes])) {
      const validator = validators[allowedTypes]
      validator(recurse, item, name)
    } else if (is.object(item) && !is.array(item)) {
      const msg = name + '.type must be any of ' + allowedTypes.join(', ')
      a.ok(allowedTypes.includes(item.type), msg)

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
