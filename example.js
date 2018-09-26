'use strict'

const validJourney = require('friendly-public-transport-format/examples/valid-journey.json')
const validStation = {type: 'station', id: '123', name: 'foo', location: {type: 'location', latitude: 1, longitude: 2}}
const validStop = {type: 'stop', id: '321', name: 'foo', location: {type: 'location', latitude: 1, longitude: 2}, station: validStation}

const createValidate = require('.')

const validate = createValidate()

validate(validJourney)
validate(validStation, 'station')
validate(validStop, ['station', 'stop'])
