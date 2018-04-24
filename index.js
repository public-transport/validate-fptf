'use strict'

const anyOf = require('./lib/any-of')

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
const reference = require('./lib/reference')
const date = require('./lib/date')
const mode = require('./lib/mode')
const item = require('./lib/item')

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
  journeyLeg,
  ref: reference,
  date,
  mode,
  item
}

const createValidate = (validators = {}) => {
  const val = Object.assign({}, defaultValidators, validators)
  const validate = (item, name = 'item') => {
    anyOf(Object.keys(val), val, item, name)
  }
  return validate
}

createValidate.defaultValidators = defaultValidators
module.exports = createValidate
