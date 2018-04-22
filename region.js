'use strict'

const a = require('assert')

const validateRegion = (val, region, name = 'region') => {
  val.item(val, region, name)

  a.strictEqual(region.type, 'region', name + '.type must be `region`')

  val.ref(val, region.id, name + '.id')

  a.strictEqual(typeof region.name, 'string', name + '.name must be a string')
  a.ok(region.name.length > 0, name + '.name can\'t be empty')

  a.ok(Array.isArray(region.stations), name + '.stations must be an array')
  for (let i = 0; i < region.stations.length; i++) {
    const s = region.stations[i]
    val.station(val, s, name + `.stations[${i}]`)
  }
}

module.exports = validateRegion
