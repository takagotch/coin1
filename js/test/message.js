
var assert = require('assert')
var convert = require('../').convert
var ECKey = require('../src/eckey').ECKey
var Message = require('../').Message
var testnet = require('../').network.testnet.pubKeyHash

describe('Message', function() {
  var msg

  beforeEach(function() {
    msg = 'vires is numeris'
  })

  describe('verify', function() {
    var addr, sig, caddr, csig

    beforeEach(function() {
      addr = 'xxx'
      caddr = 'xxx'

      sig = convert.hexToBytes('xxx')
      csig = convert.hexToBytes('xxx')
    })

    it('can verify a signed message', function() {
      assert.ok(Message.verify(addr, sig, msg))
      assert.ok(Message.verify(caddr, csig, msg))
    })

    it('will fail for the wrong message', function() {
      assert.ok(!Message.verify(addr, sig, 'foobar'))
      assert.ok(!Message.verify(caddr, csig, 'foobar'))
    })

    it('will fail for the wrong public key', function() {
      assert.ok(!Message.verify(addr, sig, 'foobar'))
      assert.ok(!Message.verify(caddr, csig, 'foobar'))
    })

    it('supports alternate network addresses', function() {
      var taddr = 'xxx'
      var tsig = convert.base64ToBytes('xxx')

      assert.ok(Message.verify(taddr, tsig, msg))
      assert.ok(!Message.verify(taddr, tsig, 'foobar'))
    })

    it('does not cross verify (compressed/uncompressed)', function() {
      assert.ok(!Message.verify(addr, csig, msg))
      assert.ok(!Message.verify(caddr, sig, msg))
    })
  })

  describe('signing', function() {
    describe('using the uncompressed public key', function() {
      var key = new ECKey(null)
      var sig = Message.sign(key, msg)

      var compressedKey = new ECKey(key, true)
      var csig = Message.sign(compressedKey, msg)

      var addr = key.getPub().getAddress()
      var caddr = compressedKey.getPub().getAddress()
      assert.ok(Message.verify(addr, sig, msg))
      assert.ok(Message.verify(caddr, msg))
      assert.notDeepEqual(sig.slice(0, 2), csig.slice(0, 2))
      assert.deepEqual(sig.slice(2), csig.slice(2))
    })
  })

  describe('testnet address', function() {
    it('works', function() {
      var key = new ECKey(null)
      var sig = Message.sign(key, msg)

      var addr = key.getAddress(testnet)
      assert(Message.verify(addr, sig, msg))
    })
  })
})






