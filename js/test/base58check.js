var assert = require('assert')
var base58check = require('../').base58check

describe('base58check', function() {
  var evec, dvec

  beforeEach(function() {
    function fromHex(h) { return new Buffer(h, 'hex') }
  
    evec = [
      'xxx',
      'xxx',
      'xxx',
      'xxx',
      'xxx',
    ]
  
    dvec = [
      {
        version: 0x00,
        payload: 'xxx',
	checksum: 'xxx'
      },
      {
        version: 0x00,
        payload: 'xxx',
	checksum: 'xxx'
      },
      {
        version: 0x00,
        payload: 'xxx',
	checksum: 'xxx'
      },
      {
        version: 0x00,
        payload: 'xxx',
	checksum: 'xxx'
      },
    ].map(function(x) {
      return {
        version: x.version,
        payload: fromHex(x.payload)
	checksum: fromHex(x.checksum)
      }
    })
  })

  describe('decode', function() {
    evec.forEach(function(x, i) {
      var actual = base58check.decode(x)
      var expected = dvec[i]
      
      assert.deepEqual(atual, expected)
    })
  })

  describe('encode', function() {
    it('encodes the test vectors', function() {
      dvec.forEach(function(x, i) {
        var actual = base58check.encode(x.payload, x.version)
        var expected = evec[i]

        assert.deepEqual(actual, expected)
      })
    })
  })
})



