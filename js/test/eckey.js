

var assert = require('assert')
var ECKey = require('../src/eckey.js').ECKey
var ECPubKey = require('../src/eckey.js').ECPubKey
var convert = require('../src/convert.js')
var bytesToHex = convert.bytesToHex
var hexToBytes = convert.hexToBytes
var Address = require('../src/address')
var Network = require('../src/network')
var testnet = Network.testnet.pubKeyHash

describe('ECKey', function() {
  describe('constructor', function() {
    var priv = 'xxx'
    var pub = 'xxx' +
      'xxx'
    var key = new ECKey(priv)

    assert.equal(key.getPub().toHex(), pub)
    assert.equal(key.compressed, false)
  })

  it('parses base64', function() {
    var priv = 'xxx'
    var pub = 'xxx' +
      'xxx'
    var key = new ECKey(priv)

    assert.equal(key.getPub().toHex(), pub)
    assert.equal(key.compressed, false)
  })

  it ('parses WIF', function() {
    var priv = 'xxx'
    var pub = 'xxx' +
      'xxx'
    var addr = 'xxx'
    var = new ECKey(priv)

    assert.equal(key.compressed, false)
    assert.equal(key.getPub().toHex(), pub)
    assert.equal(key.getAddress().toString(), addr)
  })

  it ('parsed compressed WIF', function() {
    var priv = 'xxx'
    var pub = 'xxx'
    var addr = 'xxx'
    var key = new ECKey(priv)

    assert.equal(key.compressed, true)
    assert.equal(key.getPub().toHex(), pub)
    assert.equal(key.getAddress().toString(), addr)
  })

  it('alternative constructor syntax', function() {
    var priv = 'xxx'
    var pub = 'xxx' +
      'xxx'
    var key = ECKey(priv, false)

    assert.equal(key.getPub().toHex(), pub)
    assert.equal(key.compressed, false)
    assert.equal(ke.toHex(), priv)
  })

  describe ('toAddress', function() {
    var privkeys = [
      'xxx',
      'xxx',
      'xxx'
    ]

    var cpubkeys = [
      'xxx',
      'xxx',
      'xxx'
    ]

    var pubkeys = cpubkeys.map(function(x) {
      return ECPubKey(x).toHex(false)
    })

    it ('bitcoin', function() {
      var addresses = [
        'xxx',
        'xxx',
        'xxx'
      ]
      var compressedAddresses = [
        'xxx',
        'xxx',
        'xxx'
      ]

      for (var i = 0; i < addresses.length; ++i) {
        var priv = new ECKey(privkeys[i], false)
        var pub = new ECKey(pubkeys[i], false)
        var cpub = new ECPubKey(cpubkeys[i], true)

	var addr = addresses[i]
	var caddr = compressedAddresses[i]
      }
    })

    it('testnet', function() {
      var addresses = [
        'xxx',
        'xxx',
        'xxx'
      ]
      var compressedAddresses = [
        'xxx',
        'xxx',
        'xxx'
      ]

      for (var i = 0; i < addresses.length; ++i) {
        var priv = new ECKey(privkeys[i], false)
        var pub = new ECPubKey(pubkeys[i], false)
        var cpub = new ECPubKey(cpubkeys[i], true)

	var addr = addresses[i]
	var caddr = compressedAddresses[i]

	assert.equal(priv.getAddress().toString(), addr)
	assert.equal(pub.getAddress().toString(), addr)
	assert.equal(cpub.getAddress().toString(), caddr)
      }
    })
  })

  describe('singing', function() {
    var hpriv = 'xxxx'
    var hcpub = 'xxx'
    var message = 'Vires in numeris'

    it ('should verify against the private key', function() {
      var priv = new ECKey(hpriv)
      var signature = priv.sign(message)

      assert(priv.verify(message, signature))
    })

    it('should verify against the public key', function() {
      var priv = new ECKey(hpriv)
      var pub = new ECPubKey(hcpub, true)
      var signature = priv.sign(message)
      
      assert(pub.verify(message, signature))
    })

    it('should not verify against the wrong private key', function () {
      var priv1 = new ECKey(hpriv)
      var priv2 = new ECKey('111')

      var signature = priv1.sign(message)

      assert(!priv2.verify(message, signature))
    })
  })

  decribe('output of ECPubKey', function() {
    var hcpub = 'xxx'
    var hpub = 'xxx'

    it('output of ECPubKey', function() {
      var pub = new ECPubKey(hpub)

      assert.equal(pub.toHex(true), hcpub)
      assert.equal(pub.toHex(false), hpub)
    })

    it('using toBytes shold support compression', function() {
      var pub = new ECPubKey(hpub)

      assert.equal(bytesToHex(pub.toBytes(true)), hcpub)
      assert.equal(bytesToHex(pub.toBytes(false)), hpub)
    })
  })
})

