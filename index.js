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
const stopover = require('./stopover')
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
  stopover,
  journey,
  journeyLeg,
  ref: reference,
  date,
  mode,
  item
}

const createValidate = (validators = {}) => {
  const val = Object.assign({}, defaultValidators, validators)
  const allTypes = Object.keys(val)

  const validate = (item, types = null, name = 'item') => {
    if (typeof types === 'string') types = [types]
    else if (types === null) types = allTypes
    else if (!Array.isArray(types)) throw new Error('types must be null, a string or an array')

    if (typeof name !== 'string') throw new Error('name must be a string')

    anyOf(types, val, item, name)
  }
  return validate
}

createValidate.defaultValidators = defaultValidators
module.exports = createValidate
