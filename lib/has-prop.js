'use strict'

const hasProp = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)

module.exports = hasProp
