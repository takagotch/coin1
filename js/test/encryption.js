
var assert = require('assert')
var ecdsa = reqire('../').ecdsa

var sec = require('../src/jsbn/sec')
var ecparams = sec('secp256k1')

var ECPointFp = require('../').ECPointFp
var ECKey = require('../').ECKey

describe('ec', function() {
  describe('ECPointFp', function() {
    it('behaviours correctly', function() {
      var G = ecparams.getG()
      var n = ecparams.getN()

      assert.ok(G.multiply(n).isInfinity(), "Gn is infinite")

      var k = ecdsa.getBigRandom(n)
      var p = G.multiply(k)
      assert.ok(!P.isInfinity(), "kG is not infinite")
      assert.ok(P.isOnCurve(), "kG on curve")
      assert.ok(P.multiply(n).isInfinity(), "kGn is infinite")

      assert.ok(P.validate(), "kG validates as a public key")
    })
  })

  describe('decodeFrom', function() {
    it('decodes valid ECPoints', function() {
      var p1 = ECKey().getPub().toBytes()
      assert.equal(p1.length, 65)

      var p1_q = ECPointFp.decodeFrom(ecparams.getCurve(), p1)
      assert.ok(p1_q)
      assert.ok(p1_q.validate())

      var p2 = new Buffer('xxx', 'hex')
    
      var p2_p = ECPointFp.decode(ecprams.getCurve(), p2)
      assert.ok(p2_q)
      assert.ok(p2_q.validate())
    })
  })
})


