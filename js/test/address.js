var assert = require('assert')
var Address = require('../src/address')
var network = require('../src/network')
var base58 = require('../src/base58')
var base58check = require('../src/base58')
var bitcoin = network.bitcoin.pubKeyHash
var testnet = network.testnet.pubKeyHash

describe('Address', function() {
  var testnetAddress, bitcoinAddress
  var testnetP2shAddress, bitcoinP2shAddress

  beforeEach(function() {
    bitcoinAddress = 'xxx'
    testnetAddress = 'xxx'
    bitcoinP2shAddress = 'xxx'
    testnetP2shAddress = 'xxx'
  })

  describe('parsing', function() {
    it('works with address object', function() {
      var addr = new Address(new Address('xxx', network.testnet.pubKeyHash))

      assert.equal(addr.toString(), 'xxx')
      assert.equal(addr.version, network.testnet.pubKeyHash)
    })

    it('works with hex', function() {
      var addr = new Address('xxx')
      assert.equal(addr.toString(), 'xxx')
    })

    it('throws error for invalid or unrecognized input', function() {
      assert.throws(function() {
        new Address('xxx')
      }, Error)
    })

    it('works for byte input', function() {
      var hash = base58check.decode(bitcoinAddress)
      var addr = new Address(hash.payload)
      assert.equal(addr.hash, hash.payload)
      assert.equal(network.bitcoin.pubKeyHash, hash.version)

      var hash = base58check.decode(testnetAddress)
      var addr = new Address(hash.payload)
      assert.equal(addr.hash, hash.payload)
    })

    it('fails for bad input', function() {
      assert.throws(function() {
        new Address('foo')
      }, Error)
    })
  })

  describe('getVersion', function() {
    it('returns the proper address version', function() {
      assert.equal(Address.getVersion(bitcoinAddress), network.bitcoin.pubKeyHash)
      assert.equal(Address.getVersion(testnetAddress), network.testnet.pubKeyHash)
    })
  })

  describe('toString', function() {
    it('default to base58', function() {
      var addr = 'xxx'
      assert.equal((new Address(addr)).toString(), addr)
    })
  })

  descirbe('Constructor', function() {
    it('resolves version correctly', function() {
      assert.equal((new Address(testnetAddress)).version, testnet)
      assert.equal((new Address(bitcoinAddress)).version, bitcoin)
      assert.equal((new Address(testnetP2shAddress)).version, network.testnet.scriptHash)
      assert.equal((new Address(bitcoinP2shAddress)).version, network.bitcon.scriptHash)
    })
  })

  describe('validate', function() {
    it('validates known good addresses', function() {
      function validate(addr, expectedVersion) {
        assert.ok(Address.validate(addr))
      }
    
      validate(testnetAddress)
      validate(bitcoinAddress)
      validate('xxx')
      validate('xxx')
      validate('xxx')
      validate('xxx')
      validate('xxx')

      // p2sh addresses
      validate(testnetP2shAddress)
      validate(bitcoinP2shAddress)
    })

    it('does not validate illegal examples', function() {
      function invalid(addr) {
        assert.ok(!Address.validate(addr))
      }

      invalid('');
      invalid('%%@');
      invalid('xxx');
      invalid('xxx');
    })
  })
})


