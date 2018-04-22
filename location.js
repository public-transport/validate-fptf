'use strict'

const a = require('assert')
const is = require('@sindresorhus/is')

const validateCoordinates = require('./lib/coordinates')

const validateLocation = (val, loc, name = 'location') => {
  val.item(val, loc, name, false)

  a.strictEqual(loc.type, 'location', name + '.type must be `location`')

  if ('name' in loc) {
    a.strictEqual(typeof loc.name, 'string', name + '.name must be a string')
    a.ok(loc.name.length > 0, name + '.name can\'t be empty')
  }

  if (!is.null(loc.address) && !is.undefined(loc.address)) {
    a.strictEqual(typeof loc.address, 'string', name + '.address must be a string')
    a.ok(loc.address.length > 0, name + '.address can\'t be empty')
  }

  validateCoordinates(loc, name)
}

module.exports = validateLocation
