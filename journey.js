'use strict'

const is = require('@sindresorhus/is')
const a = require('assert')
const isCurrencyCode = require('is-currency-code')

const isField = (obj, f) => {
  return !is.null(obj[f]) && !is.undefined(obj[f])
}

const validateJourney = (val, journey, name = 'journey') => {
  val.item(val, journey, name)

  a.strictEqual(journey.type, 'journey', name + '.type must be `journey`')

  val.ref(val, journey.id, name + '.id')

  a.ok(Array.isArray(journey.legs), name + '.legs must be an array')
  a.ok(journey.legs.length > 0, name + '.legs can\'t be empty')
  for (let i = 0; i < journey.legs.length; i++) {
    val.leg(val, journey.legs[i], name + `.legs[${i}]`)
  }
  // todo: check if sorted correctly

  if (isField(journey, 'price')) {
    const p = journey.price
    a.ok(is.object(p) && !is.array(p), name + '.price must be an object')
    a.strictEqual(typeof p.amount, 'number', name + '.price.amount must be a number')
    a.strictEqual(typeof p.currency, 'string', name + '.price.currency must be a string')
    a.ok(isCurrencyCode(p.currency), name + '.price.currency must be a valid ISO 4217 currency code')
  }
}

module.exports = validateJourney
