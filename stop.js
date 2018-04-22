'use strict'

const a = require('assert')
const is = require('@sindresorhus/is')

const validateStop = (val, stop, name = 'stop') => {
  val.item(val, stop, name)

  a.strictEqual(stop.type, 'stop', name + '.type must be `stop`')

  val.ref(val, stop.id, name + '.id')

  val.station(val, stop.station, name + '.station')

  a.strictEqual(typeof stop.name, 'string', name + '.name must be a string')
  a.ok(stop.name.length > 0, name + '.name can\'t be empty')

  if (!is.null(stop.location) && !is.undefined(stop.location)) {
    val.location(val, stop.location, name + '.location')
  }

  if (!is.null(stop.coordinates) && !is.undefined(stop.coordinates)) {
    a.fail(name + '.coordinates should be renamed to ' + name + '.location')
  }
}

module.exports = validateStop
