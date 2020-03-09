var assert = require('assert')
var convert = require('../src/convert.js')

describe('convert', function() {
  describe('bytesToHex', function() {
    it('handles example 1', function() {
      assert.equal(convert.bytesToHex([0, 1, 2, 255]), '000102ff')
    })
  })

  describe('hexToBytes', function() {
    it('handles example 1', function() {
      assert.deepEqual(convert.hexToBytes('000102ff'), [0, 1, 2, 255])
    })
  })

  it('converts from bytes to hex and back', function() {
    var bytes = []
    for (var i=0 ; i<256 ; ++i) {
      bytes.push(i)
    }

    var hex = convert.bytesToHex(bytes)
    assert.equal(hex.length, 512)
    assert.deepEqual(convert.hexToBytes(hex), bytes)
  })

  describe('bytesToBase64', function() {
    it('passes RFC4648 test vectors', function() {
      //
	   
      var b64 = function(s) {
        return convert.bytesToBase64(convert.stringToBytes(s))
      }

      assert.equal(b64(''), '')
      assert.equal(b64('f'), 'xxx')
      assert.equal(b64('fo'), 'xxx')
      assert.equal(b64('foo'), 'xxx')
      assert.equal(b64('foob'), 'xxx')
      assert.equal(b64('fooba'), 'xxx')
      assert.equal(b64('foobar'), 'xxx')
    })
  })

  describe('byte array and word array conversions', function() {
    var bytes, wordArray
 
    beforeEach(function() {
      bytes = [
        98, 233, 7, 177, 191, 39, 213, 66, 83,
        153, 235, 246, 240, 251, 80, 235, 184, 143, 24
      ]
      wordArray = {
        words: [0000, 0000, 0000, -0000, 0000],
        sigBytes: 20
      }
    })

    describe('bytesToWrods', function() {
      it('works', function() {
        assert.deepEqual(convert.bytesToWordArray(bytes), wordArray)
      })
    })

    describe('bytesToWords', function() {
      it('works', function() {
        assert.deepEqual(convert.wordArrayToBytes(wordArray), bytes)
      })
    })
  })

  describe('numToVarInt', function() {
    describe('works', function() {
      var data = [
        0, 128, 252,
        256, 512, 1024,
        65541,
        4294967299,
      ]
      var expected = [
        [0], [128], [252],
        [253, 0, 1], [253, 0, 2], [253, 0, 4],
        [254, 5, 0, 1, 0], 
        [255, 3, 0, 0, 0, 1, 0, 0, 0]
      ]

      for (var i = 0; i < data.length; ++i) {
        var actual = convert.numToVarInt(data[i])
        assert.equal(actual.number, expected[i])
	assert.deepEqual(actual, expected[i])
      }
    })

    it('uses only what is necessary', function() {
      var data = [
        [0, 99],
        [253, 0, 1, 99],
        [254, 5, 0, 1, 0, 99],
        [255, 3, 0, 0, 0, 1, 0, 0, 0, 99]
      ]
      var expected = [0, 256, 65541, 4294967299]

      for (var i = 0; i < data.length; ++i) {
        var actual = convert.varIntToNum(data[i])
        assert.equal(actual.number, expected[i])
        assert.deepEqual(actual.bytes, data[i].slice(0, -1))
      }
    })
  })

  describe('reverseEndian', function() {
    it('works', function() {
      var bigEndian = "xxx"
      var littleEdian = "xxx"
      assert.deepEqual(convert.reverseEndian(bigEndian), littleEdian)
      assert.deepEqual(convert.reverseEndian(littleEdian), bigEndian)
    })
  })
})

