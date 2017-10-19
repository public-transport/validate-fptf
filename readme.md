# validate-fptf

**Validate data in the [*Friendly Public Transport Format*](https://github.com/public-transport/friendly-public-transport-format).** Follows the version of the [*Friendly Public Transport Format* (FPTF) spec](https://github.com/public-transport/friendly-public-transport-format).

[![npm version](https://img.shields.io/npm/v/validate-fptf.svg)](https://www.npmjs.com/package/validate-fptf)
[![build status](https://img.shields.io/travis/derhuerst/validate-fptf.svg)](https://travis-ci.org/derhuerst/validate-fptf)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/validate-fptf.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)


## Installing

```shell
npm install validate-fptf
```


## Usage

```js
const validate = require('validate-fptf')

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
```


## API

```js
validate(obj)
```

Recursively walks `obj`. Throws an [`AssertionError`](https://nodejs.org/api/errors.html#errors_class_assertionerror) if something is not valid [FPTF](https://github.com/public-transport/friendly-public-transport-format).


## Contributing

If you have a question or have difficulties using `validate-fptf`, please double-check your code and setup first. If you think you have found a bug or want to propose a feature, refer to [the issues page](https://github.com/derhuerst/validate-fptf/issues).
