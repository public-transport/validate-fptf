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
  item
}

const validate = (item, validators = defaultValidators) => {
  const ctx = Object.assign({}, validators)
  anyOf(validTypes, ctx, item, 'obj')
}

validate.defaultValidators = defaultValidators
module.exports = validate
