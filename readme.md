# validate-fptf

**Validate data in the [*Friendly Public Transport Format*](https://github.com/public-transport/friendly-public-transport-format).** Currently validates against the [*Friendly Public Transport Format* (FPTF) `2.0.0` draft](https://github.com/public-transport/friendly-public-transport-format/blob/v2-draft/spec/readme.md).

[![npm version](https://img.shields.io/npm/v/validate-fptf.svg)](https://www.npmjs.com/package/validate-fptf)
[![build status](https://img.shields.io/travis/public-transport/validate-fptf.svg)](https://travis-ci.org/public-transport/validate-fptf)
![ISC-licensed](https://img.shields.io/github/license/public-transport/validate-fptf.svg)
[![chat on gitter](https://badges.gitter.im/public-transport.svg)](https://gitter.im/public-transport)


## Installing

```shell
npm install validate-fptf
```


## Usage

```js
const createValidate = require('validate-fptf')

const validate = createValidate() // you may pass in custom validators here

validate({
  type: 'journey',
  id: '12345',
  legs: [{
    origin: {
      type: 'station',
      id: '12345678',
      name: 'Foo'
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

validate({
  type: 'station',
  id: '123',
  name: 'foo',
  location: {
    type: 'location',
    latitude: 1,
    longitude: 2
  }
}, ['station', 'stop'])
```


## API

```js
const validate = createValidate(customValidators = {})
```

You may provide an object `customValidators`, where each key is an *FPTF* type, and the corresponding function validates an *FPTF* object of this type.

```js
validate(item, types = allTypes, name = 'item')
```

`validate` recursively validates `item`. Throws an [`AssertionError`](https://nodejs.org/api/errors.html#errors_class_assertionerror) if something is not valid [FPTF `2.0.0` draft](https://github.com/public-transport/friendly-public-transport-format/blob/v2-draft/spec/readme.md).

To validate against one or more *specific* FPTF types, provide a string or an array of strings via the `types` parameter.

To get more meaningful assertion errors, provide the name of your item via the `name` parameter.


## Contributing

If you have a question or have difficulties using `validate-fptf`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/public-transport/validate-fptf/issues).
