'use strict'

const validate = require('.')

validate({
  type: 'journey',
  id: '12345',
  legs: [{
    origin: {
      type: 'station',
      id: '12345678',
      name: 'Foo',
      location: {
        type: 'location',
        longitude: -20,
        latitude: 30
      }
    },
    destination: {
      type: 'station',
      id: '87654321',
      name: 'Bar'
    },
    departure: '2017-03-16T20:00:00+01:00',
    departurePlatform: '4-1',
    arrival: '2017-03-17T15:00:00+02:00',
    arrivalPlatform: '9',
    schedule: '1234',
    mode: 'walking',
    public: true,
    operator: 'sncf'
  }],
  price: {
    amount: 19.95,
    currency: 'EUR'
  }
})
