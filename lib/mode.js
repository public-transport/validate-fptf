'use strict'

// https://github.com/public-transport/friendly-public-transport-format/blob/master/docs/readme.md#modes
const validModes = [
	'walking',
	'train',
	'bus',
	'ferry'
]

const validateMode = (test, mode, name = 'mode') => {
  test.equal(typeof item, 'string', name + ' must be a string')
  test.ok(validModes.includes(mode), 'invalid ' + name)
}

module.exports = validateMode
