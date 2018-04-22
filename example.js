'use strict'

const validJourney = require('friendly-public-transport-format/examples/valid-journey.json')

const createValidate = require('.')

const validate = createValidate()

validate(validJourney)
