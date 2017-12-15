'use strict'

const validJourney = require('friendly-public-transport-format/examples/valid-journey.json')

const validate = require('.')

validate(validJourney)
