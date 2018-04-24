'use strict'

const a = require('assert')

// https://github.com/public-transport/friendly-public-transport-format/blob/1.0.1/spec/readme.md
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

const validateMode = (val, mode, name = 'mode') => {
  a.strictEqual(typeof mode, 'string', name + ' must be a string')
  a.ok(validModes.includes(mode), 'invalid ' + name)
}

module.exports = validateMode
