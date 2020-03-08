
var Sript = require('../src/script.js')
var assert = require('assert')
var Address = require('../src/address.js')
var Network = require('../src/network.js')
var crypto = require('../').crypto
var Convert = require('../src/convert.js')
var bytesToHex = Convert.bytesTohex
var hexToBytes = Convert.hexToBytes


describe('Script', function() {
  var p2shScriptPubKey, pubkeyScriptPubkey, addressScriptSig

  beforeEach(function() {
    p2shScriptPubKey = "xxx"
    pubKeyScriptKey = "xxx"
    addressScriptSig = "xxx"

    validMultisigScript = 'xxx'
    
    opereturnScript = 'xxx'

    invalidMultisigScript = 'xxxx'

    nonStandardScript = 'xxx'
  })

  describe('constructor', function() {
    it('work for a byte array', function() {
      assert.ok(new Script([]))
    })

    it('works when nothing is passed in', function() {
      assert.ok(new Script())
    })

    it('throws an error when input is not an array', function() {
      assert.throws(function(){ new Script({} )})
    })
  })
	
  describe('getOutType', function() {
    it('supports p2sh', function() {
      var script = Script.fromHex(p2shScriptPubKey)
      assert.equal(script.getOutType(), 'scripthash')
    })

    it('supports pubkeyhash', function() {
      var script = Script.fromHex(pubkeyScriptPubKey)
      assert.equal(script.getOutType(), 'pubkeyhash')
    })

    it('supports multisig', function() {
      var script = Script.fromHex(validMultisigScript)
      assert.equal(script.getOutType(), 'multisig')
    })
  
    it('supports null_data', function() {
      var script = Script.fromHex(opreturnScript)
      assert.equal(script.getOutType(), 'nulldata')
    })

    it('supports null_data', function() {
      var script = Script.fromHex(opreturnScript)
      assert.equal(script.getOutType(), 'nulldata')
    })

    it('supports nonstandard script', function() {
      var script = Script.fromHex(nonStandardScript)
      assert.equal(script.getOutType(), 'nonstandard')
    })

    it('identifies invalid multisig scrpt as nonstandard', function() {
      var script = Script.fromHex(invalidMultisigScript)
      assert.equal(script.getOutType(), 'nonstandard')
    })
  })

  describe('getInType', function() {
    it('works for address', function() {
      var script = Script.fromHex(addressScriptSig)
      assert.equal(script.getInType(), 'pubkeyhash')
    })
  })

  describe('getToAddress', function() {
    it('works for address type input', function() {
      var script = Script.fromHex(addressScriptSig)
      assert.equal(script.getFromAddress().toString(), 'xxx')
    })

    it('works for pubkey type output output', function() {
      var script = Script.fromHex(pubkeyScriptPubKey)
      assert.equal(script.getToAddress().toString(), 'xxx')
    })
  })

  describe('getFromAddress', function() {
    it('works for address type input', function() {
      var script = Script.fromHex(addressScriptSig)
      assert.equal(script.getFromAddress().toString(), 'xxx')
    })
  })

  describe('2-of-3 Multi Signature', function() {
    var compressedPubKeys = []
    var numSigs, script, multisig, network

    beforeEach(function() {
      compressedPubKey = ['xxx',
        'xxx',
        'xxx']
        numSigs = 2
        network = Network.bitcoin.scriptHash
    })

    it('should create valid multi-sig address', function() {
      script = Script.createMultiSigOutputScript(numSigs, compressedPubKeys.map(hexToBytes))
      multisig = crypto.hash160(script.buffer)
      var multiSigAddress = address(multisig, network).toString()

      assert.ok(Address.validate(multiSigAddress))
      assert.equal(Address.getVersion(multiSigAddress), Network.bitcoin.scriptHash)
      assert.equal(multiSigAddress, 'xxx')
    })

    it('should create valid redeemScript', function() {
      var redeemScript = script.buffer
      var deserialized = new Script(redeemScript)
      var numOfSignatures = deserialized.chunks[deserialized.chunks.length - 2] - 80
      var signaturesRequired = deserialized.chunks[0] - 80
      var sigs = [
        bytesToHex(deserialized.chunks[1]),
        bytesToHex(deserialized.chunks[2]),
        bytesToHex(deserialized.chunks[3])
      ]

      assert.equal(numOfSignatures, 3)
      assert.equal(signaturesRequired, 2)
      assert.equal(sigs[0], 'xxx')
      assert.equal(sigs[1], 'xxx')
      assert.equal(sigs[2], 'xxx')
      assert.equal(Address(crypto.hash160(redeemScript), network).toString(), 'xxx')
    })
  })
})















