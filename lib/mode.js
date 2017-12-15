'use strict'

const a = require('assert')

// https://github.com/public-transport/friendly-public-transport-format/blob/master/docs/readme.md#modes
const validModes = [
  'train',
  'bus',
  'watercraft',
  'taxi',
  'gondola',
  'aircraft',
  'car',
  'bicycle',
  'walking'
]

const validateMode = (mode, name = 'mode') => {
  a.strictEqual(typeof mode, 'string', name + ' must be a string')
  a.ok(validModes.includes(mode), 'invalid ' + name)
}

module.exports = validateMode
