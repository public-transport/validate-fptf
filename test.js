'use strict'

const test = require('tape')
const validJourney = require('friendly-public-transport-format/examples/valid-journey.json')
const validSimpleJourney = require('friendly-public-transport-format/examples/valid-simple-journey.json')
const invalidJourney = require('friendly-public-transport-format/examples/invalid-journey.json')

const validateFptf = require('.')

test('passes with valid-journey.json from FPTF', (t) => {
  t.doesNotThrow(() => validateFptf(validJourney))
  t.doesNotThrow(() => validateFptf(validSimpleJourney))
  t.throws(() => validateFptf(invalidJourney))

  t.end()
})

test('passes with valid-simple-journey.json from FPTF', (t) => {
  t.doesNotThrow(() => validateFptf(validSimpleJourney))

  t.end()
})

test('fails with invalid-journey.json from FPTF', (t) => {
  t.throws(() => validateFptf(invalidJourney))

  t.end()
})

test('lets you override the validators', (t) => {
  t.doesNotThrow(() => {
    validateFptf(invalidJourney, {
      journey: () => {}
    })
  })
  t.end()
})
