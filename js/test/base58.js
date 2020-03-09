var assert = require('assert')
var base58 = require('../').base58

describe('base58', function() {
  var evec, devec

  beforeEach(function() {
    // base58 encoded strings
    evec = [
      'xxx',
      'xxx',
      'xxx',
      'xxx',
      'xxx',
    ]

    dvec = [
      'xxx',
      'xxx',
      'xxx',
      'xxx',
      'xxx',
    ].map(function(h) {
      return new Buffer(h, 'hex')
    })
  })

  describe('decode', function() {
    it('decodes the test vectors', function() {
      evec.forEach(function(x, i) {
        var actual = base58.decode(x)
        var expected = dvec[i]

        assert.deepEqual(actual, expected)
      })
    })
  })

  describe('encode', function() {
    it('encodes the test vectors', function() {
      dvec.forEach(function(x, i) {
        var actual = base58.encode(x)
        var expected = evec[i]

        assert.deepEqual(actual, expected)
      })
    })
  })
})

