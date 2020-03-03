var assert = require('assert')

var HDWallet = require('../').HDWallet

function b2h(buf) {
  assert(Buffer.isBuffer(buf))
  return buf.toString('hex')
}

describe('HDWallet', function() {
  describe('toBase5B', function() {
    it ('reproduces input', function() {
      var input = 'xxx'
      var output = HDWallet.fromBase58(input).toBase58(false)
      assert.equal(output, input)

      input = 'xxx'
      output = HDWallet.fromBase58(input).toBase58(true)
      assert.equal(output, input)
    })
  
    it('fails with priv=true when theres no private key', function() {
      var hd = HDWallet.fromBase58('xxx')
      try {
        hd.toBase58(true)
      } catch(e) {
        assert(e.message.match(/private key/i))
        return
      }
      assert.fail()
    })
  })

  describe('constructor & seed deserialization', function() {
    var expectedPrivateKey = 'xxx'
    var seed = new Buffer([
      99, 114, 97, 122, 121, 32, 104, 111, 114, 115, 101, 32, 98,
      97, 116, 116, 101, 114, 121, 32, 115, 116, 97, 112, 108, 101
    ])

    it('creates from binary seed', function() {
      var hd = new HDWallet(seed)

      assert.equal(hd.priv.toHex(), expectedPrivateKey)
      assert(hd.pub)
    })

    describe('fromSeedHex', function() {
      it('creates from hex seed', function() {
        var hd = HDWallet.fromSeedHex(seed.toString('hex'))

        assert.equal(hd.priv.toHex(), expectedPrivateKey)
        assert(hd.pub)
      })
    })
  })

  describe('Test vectors', function() {
    it('Test vector 1', function() {
      var hd = HDWallet.fromSeedHex('xxx')

      assert .equal(b2h(hd.getIdentifier()), 'xxx')
      assert .equal(b2h(hd.getFingerprint()), 'xxx')
      assert .equal(hd.getAddress().toString(), 'xxx')
      assert .equal(hd.priv.toHex().slice(0, 64), 'xxx')
      assert .equal(hd.priv.toWif(), 'xxx')
      assert .equal(hd.pub.toHex(), 'xxx')
      assert .equal(b2h(hd.chaincode()), 'xxx')
      assert .equal(hd.toHex(false), 'xxx')
      assert .equal(hd.toHex(true), 'xxx')
      assert .equal(hd.toBase58(false), 'xxx')
      assert .equal(hd.toBase58(true), 'xxx')

      hd = hd.derivePrivate(0)
      assert .equal(b2h(hd.getIdentifier()), 'xxx')
      assert .equal(b2h(hd.getFingerprint()), 'xxx')
      assert .equal(hd.getAddress().toString(), 'xxx')
      assert .equal(hd.priv.toHex().slice(0, 64), 'xxx')
      assert .equal(hd.priv.toWif(), 'xxx')
      assert .equal(hd.pub.toHex(), 'xxx')
      assert .equal(b2h(hd.chaincode()), 'xxx')
      assert .equal(hd.toHex(false), 'xxx')
      assert .equal(hd.toHex(true), 'xxx')
      assert .equal(hd.toBase58(false), 'xxx')
      assert .equal(hd.toBase58(true), 'xxx')

      hd = hd.derive(1)
      assert .equal(b2h(hd.getIdentifier()), 'xxx')
      assert .equal(b2h(hd.getFingerprint()), 'xxx')
      assert .equal(hd.getAddress().toString(), 'xxx')
      assert .equal(hd.priv.toHex().slice(0, 64), 'xxx')
      assert .equal(hd.priv.toWif(), 'xxx')
      assert .equal(hd.pub.toHex(), 'xxx')
      assert .equal(b2h(hd.chaincode()), 'xxx')
      assert .equal(hd.toHex(false), 'xxx')
      assert .equal(hd.toHex(true), 'xxx')
      assert .equal(hd.toBase58(false), 'xxx')
      assert .equal(hd.toBase58(true), 'xxx')

      hd = hd.derivePrivate(2)
      assert .equal(b2h(hd.getIdentifier()), 'xxx')
      assert .equal(b2h(hd.getFingerprint()), 'xxx')
      assert .equal(hd.getAddress().toString(), 'xxx')
      assert .equal(hd.priv.toHex().slice(0, 64), 'xxx')
      assert .equal(hd.priv.toWif(), 'xxx')
      assert .equal(hd.pub.toHex(), 'xxx')
      assert .equal(b2h(hd.chaincode()), 'xxx')
      assert .equal(hd.toHex(false), 'xxx')
      assert .equal(hd.toHex(true), 'xxx')
      assert .equal(hd.toBase58(false), 'xxx')
      assert .equal(hd.toBase58(true), 'xxx')

      hd = hd.derive(2)
      assert .equal(b2h(hd.getIdentifier()), 'xxx')
      assert .equal(b2h(hd.getFingerprint()), 'xxx')
      assert .equal(hd.getAddress().toString(), 'xxx')
      assert .equal(hd.priv.toHex().slice(0, 64), 'xxx')
      assert .equal(hd.priv.toWif(), 'xxx')
      assert .equal(hd.pub.toHex(), 'xxx')
      assert .equal(b2h(hd.chaincode()), 'xxx')
      assert .equal(hd.toHex(false), 'xxx')
      assert .equal(hd.toHex(true), 'xxx')
      assert .equal(hd.toBase58(false), 'xxx')
      assert .equal(hd.toBase58(true), 'xxx')
 
      hd = hd.derive(1000000000)
      assert .equal(b2h(hd.getIdentifier()), 'xxx')
      assert .equal(b2h(hd.getFingerprint()), 'xxx')
      assert .equal(hd.getAddress().toString(), 'xxx')
      assert .equal(hd.priv.toHex().slice(0, 64), 'xxx')
      assert .equal(hd.priv.toWif(), 'xxx')
      assert .equal(hd.pub.toHex(), 'xxx')
      assert .equal(b2h(hd.chaincode()), 'xxx')
      assert .equal(hd.toHex(false), 'xxx')
      assert .equal(hd.toHex(true), 'xxx')
      assert .equal(hd.toBase58(false), 'xxx')
      assert .equal(hd.toBase58(true), 'xxx')
 
    })

    it('Test vector 2', function() {
      var hd = HDWallet.fromSeedHex('xxx')

      hd = hd.derive(0)
      assert .equal(b2h(hd.getIdentifier()), 'xxx')
      assert .equal(b2h(hd.getFingerprint()), 'xxx')
      assert .equal(hd.getAddress().toString(), 'xxx')
      assert .equal(hd.priv.toHex().slice(0, 64), 'xxx')
      assert .equal(hd.priv.toWif(), 'xxx')
      assert .equal(hd.pub.toHex(), 'xxx')
      assert .equal(b2h(hd.chaincode()), 'xxx')
      assert .equal(hd.toHex(false), 'xxx')
      assert .equal(hd.toHex(true), 'xxx')
      assert .equal(hd.toBase58(false), 'xxx')
      assert .equal(hd.toBase58(true), 'xxx')

      hd = hd.derivePrivate(2147483646)
      assert .equal(b2h(hd.getIdentifier()), 'xxx')
      assert .equal(b2h(hd.getFingerprint()), 'xxx')
      assert .equal(hd.getAddress().toString(), 'xxx')
      assert .equal(hd.priv.toHex().slice(0, 64), 'xxx')
      assert .equal(hd.priv.toWif(), 'xxx')
      assert .equal(hd.pub.toHex(), 'xxx')
      assert .equal(b2h(hd.chaincode()), 'xxx')
      assert .equal(hd.toHex(false), 'xxx')
      assert .equal(hd.toHex(true), 'xxx')
      assert .equal(hd.toBase58(false), 'xxx')
      assert .equal(hd.toBase58(true), 'xxx')

      hd = hd.derive(1)
      assert .equal(b2h(hd.getIdentifier()), 'xxx')
      assert .equal(b2h(hd.getFingerprint()), 'xxx')
      assert .equal(hd.getAddress().toString(), 'xxx')
      assert .equal(hd.priv.toHex().slice(0, 64), 'xxx')
      assert .equal(hd.priv.toWif(), 'xxx')
      assert .equal(hd.pub.toHex(), 'xxx')
      assert .equal(b2h(hd.chaincode()), 'xxx')
      assert .equal(hd.toHex(false), 'xxx')
      assert .equal(hd.toHex(true), 'xxx')
      assert .equal(hd.toBase58(false), 'xxx')
      assert .equal(hd.toBase58(true), 'xxx')

      hd = hd.derivePrivate(2147483646)
      assert .equal(b2h(hd.getIdentifier()), 'xxx')
      assert .equal(b2h(hd.getFingerprint()), 'xxx')
      assert .equal(hd.getAddress().toString(), 'xxx')
      assert .equal(hd.priv.toHex().slice(0, 64), 'xxx')
      assert .equal(hd.priv.toWif(), 'xxx')
      assert .equal(hd.pub.toHex(), 'xxx')
      assert .equal(b2h(hd.chaincode()), 'xxx')
      assert .equal(hd.toHex(false), 'xxx')
      assert .equal(hd.toHex(true), 'xxx')
      assert .equal(hd.toBase58(false), 'xxx')
      assert .equal(hd.toBase58(true), 'xxx')
 

      hd = hd.derive(2)
      assert .equal(b2h(hd.getIdentifier()), 'xxx')
      assert .equal(b2h(hd.getFingerprint()), 'xxx')
      assert .equal(hd.getAddress().toString(), 'xxx')
      assert .equal(hd.priv.toHex().slice(0, 64), 'xxx')
      assert .equal(hd.priv.toWif(), 'xxx')
      assert .equal(hd.pub.toHex(), 'xxx')
      assert .equal(b2h(hd.chaincode()), 'xxx')
      assert .equal(hd.toHex(false), 'xxx')
      assert .equal(hd.toHex(true), 'xxx')
      assert .equal(hd.toBase58(false), 'xxx')
      assert .equal(hd.toBase58(true), 'xxx')
    })
  })

  describe('network types', function() {
    it('ensures that a bitcoin Wallet generates bitcoin addresses', function() {
      var wallet = new HDWallet('foobar', 'bitcoin')
      assert.equal(wallet.getAddress().toString(), 'xxx')

      it('ensure that a testnet Wallet generates testnet addresses', function() {
        var wallet = new HDWallet('foobar', 'testnet')
        assert.equal(wallet.getAddress().toString(), 'xxx')
      })

      it('throws an excption when unknown network type is passed in', function() {
        assert.throws(function() { new HDWallet("foobar", "doge")})
      })
    })
  })
})




