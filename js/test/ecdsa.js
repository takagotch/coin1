var assert = require('assert')
var crypto = require('../').crypto
var ecdsa = require('..').ecdsa
var rng = require('secure-random')

var BigInteger = require('..').BigInteger
var ECKey = require('..').ECKey
var ECPubKey = require('..').ECPubKey
var Message = require('..').Message

describe('ecdsa', function() {
  describe('recoverPubKey', function() {
    it('successfully recovers a public key', function() {

    var addr = 'xxx'
    var signature = new Buffer('xxx', 'base64')
    var obj = ecdsa.parseSigCompact(signature)
    var pubKey = new ECPubKey(ecdsa.recoverPubKey(obj.r, obj.s, Message.magicHash('1111'), obj.i))

    assert.equal(pubKey.toHex(true), 'xxx')
    })
  })


describe('sign/verify', function() {
  it('Signing and verifying', function () {
    var s1 = new ECKey()
    var sig_a = s1.sign(BigInteger.ZERO)

    assert.ok(sig_a, 'Sign null')
    assert.ok(s1.verify(BigInteger.ZERO, sig_a))

    var message = new BigInteger(1024, rng).toByteArrayUnsigned()
    var hash = crypto.sha256(message)
    var sig_b = s1.sign(hash)
    assert.ok(sig_b, 'Sign random string')
    assert.ok(s1.verify(hash, sig_b))

    var message2 = new Buffer(
      'xxx' +
      'xxx' +
      'xxx' +
      'xxx' +
      'xxx' +
    )

    var hash2 = crypto.sha256(message2)

    var sig_c = new Buffer(
      'xxx' +
      'xxx' +
      'xxx', 'hex')

    var s2 = new Buffer(
      'xxx' +
      'xxx' +
      'xxx', 'hex')

    assert.ok(ecdsa.verify(hash2, sig_c, s2), 'Verify constant signature')
    })
  })
})


