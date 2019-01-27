'use strict'

const test = require('tape')
const validJourney = require('friendly-public-transport-format/examples/valid-journey.json')
const validSimpleJourney = require('friendly-public-transport-format/examples/valid-simple-journey.json')
const invalidJourney = require('friendly-public-transport-format/examples/invalid-journey.json')

const createValidate = require('.')
const validate = createValidate()

test('passes with valid-journey.json from FPTF', (t) => {
  t.doesNotThrow(() => validate(validJourney))

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

test('against FPTF/valid-journey.json: passes with `journey` type', (t) => {
  t.doesNotThrow(() => validate(validJourney, 'journey'))
  t.doesNotThrow(() => validate(validJourney, ['journey']))
  t.doesNotThrow(() => validate(validJourney, ['journey', 'schedule']))

  t.end()
})

test('against FPTF/valid-journey.json: fails with non-`journey` type', (t) => {
  t.throws(() => validate(validJourney, 'schedule'))
  t.throws(() => validate(validJourney, ['schedule']))
  t.throws(() => validate(validJourney, ['stop', 'station']))

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
