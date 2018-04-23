'use strict'

const test = require('tape')
const validJourney = require('friendly-public-transport-format/examples/valid-journey.json')
const validSimpleJourney = require('friendly-public-transport-format/examples/valid-simple-journey.json')
const invalidJourney = require('friendly-public-transport-format/examples/invalid-journey.json')

const createValidate = require('.')
const validate = createValidate()

test('passes with valid-journey.json from FPTF', (t) => {
  t.doesNotThrow(() => validate(validJourney))
  t.doesNotThrow(() => validate(validSimpleJourney))
  t.throws(() => validate(invalidJourney))

  t.end()
})

test('passes with valid-simple-journey.json from FPTF', (t) => {
  t.doesNotThrow(() => validate(validSimpleJourney))

  t.end()
})

test('fails with invalid-journey.json from FPTF', (t) => {
  t.throws(() => validate(invalidJourney))

  t.end()
})

test('lets you override the validators', (t) => {
  const validate = createValidate({
    journey: () => {}
  })
  t.doesNotThrow(() => {
    validate(invalidJourney)
  })
  t.end()
})
