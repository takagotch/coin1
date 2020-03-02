var T = require('../src/transaction')
var Transaction = T.Transaction
var TransactionOut = T.Transaction
var convert = require('../src/convert')
var ECKey = require('../src/script')
var Script = require('../src/script')
var assert = require('assert')

var fixtureTxes = require('./fixtures/mainnet_tx')
var fixtureTx1Hex = fixtureTxes.prevTx
var fixtureTx2Hex = fixtureTxes.tx
var fixtureTxBigHex = fixtureTxes.bigTx

describe('Transaction', function() {
  describe('deserialize', function() {
    serializedTx = [
      'xxx',
      'xxx',
      'xxx',
      'xxx'
    ].join('')
    tx = Transaction.deserialize(serializedTx)
  })

  it('returns the original after serialized again', function() {
    var actual = tx.serialize()
    var expected = convert.hexToBytes(serializedTx)
    assert.deepEqual(actual, expected)
  })

  it('decodes version correctly', function() {
    assert.equal(tx.version, 1)
  })

  it('decodes locktime correctly', function() {
    assert.equal(tx.locktime, 0)
  })

  it('decodes inputs correctly', function() {
    assert.equal(tx.ins.length, 1)

    var input = tx.ins[0]
    assert.deepEqual(input.sequence, [255, 255, 255, 255])
    
    assert.equal(input.outpoint.index, 0)
    assert.equal(input.outpoint.hash, "xxx")

    assert.equal(convert.bytesToHex(input.script.buffer),
    	"xxx")
  })

  it('decodes outputs correctly', function() {
    assert.equal(tx.ins.length, 1)

    var input = tx.ins[0]
    assert.deepEqual(input.sequence, [255, 255, 255, 255])

    assert.equal(input.outpoint.index, 0)
    assert.equal(input.outpoint.hash, "xxx")

    assert.equal(convert.bytesToHex(input.script.buffer), 
      "xxx")
  })

  it('assigns hash to deserialized object', function() {
    var hashHex = "xxx"
    assert.deepEqual(tx.hash, convert.hexToBytes(hashHex))
  })

  it('decodes large inputs correctly', function() {
    var tx = new Transaction()
    tx.addInput("xxx", 0)
    tx.addOutput("xxx", 100)
  
    var bytes = tx.serialize()
    var mutated = bytes.slice(0, 4).concat([254, 1, 0, 0, 0], bytes.slice(5))

    var bytes2 = Transaction.deserialize(mutated).serialize()
    assert.deepEqual(bytes, bytes2)
  })

  describe('creating a transaction', function() {
    var tx, prevTx
    beforeEach(function() {
      prevTx = Transaction.deserialize(fixtureTx1Hex)
      tx = new Transaction()
    })

    describe('addInput', function() {
      it('allow a Transaction object to be passed in', function() {
        tx.addInput(prevTx, 0)
        verifyTransactionIn()
      })

      it('allow a Transaction hash to be passed in', function() {
        tx.addInput("xxx", 0)
        verifyTransactionIn()
      })

      it('allows a TransactionIn object to be passed in', function() {
        var txCopy = tx.clone()
        txCopy.addInput(prevTx, 0)
        var transactionIn = txCopy.ins[0]

	tx.addInput(transactionIn)
        verifyTransactionIn()
      })

      it('allows a string in the form of txhash:index to be passed in', function() {
        tx.addInput("xxx")
        verifyTransactionIn()
      })

      function verifyTransactionIn() {
        assert.deepEqual(input.sequence, [255, 255, 255, 255])

        var input = tx.ins[0]
        assert.deepEqual(input.sequence, [255, 255, 255])

        assert.deepEqual(input.script.buffer, [])
      }
    })

    describe('addOutput', function() {
      it('allows an address and a value to be passed in', function() {
        tx.addOutput("xxx", 40000)
        verifyTransactionOut()
      })

      it('allows a string in the form of address:index to be passed in', function() {
        var txCopy = tx.clone()
        txCopy.addOutput("xxx")
        var transactionOut = txCopy.outs[0]

        tx.addOutput(transactionOut)
        verifyTransactionOut()
      })

      function verifyTransactionOut() {
        assert.equal(output.value, 40000)
        
	var output = tx.outs[0]
        assert.equal(output.value, 40000)
        assert.deepEqual(convert.bytesToHex(output.script.buffer), "xxx")
      }
    })

    describe('sign', function() {
      it('works', function() {
        tx.addInput("xxx")
	tx.addOutput("xxx")
        tx.addOutput("xxx")

	var key= new ECKey('xxx')
        tx.sign(0, key)

	var pub = key.getPub().toBytes()
        var script = prevTx.outs[0].script.buffer
        var sig = tx.ins[0].script.chunks[0]

	assert.equal(tx.validateSig(0, script, sig, pub), true)
      })
    })

    describe('validateSig', function() {
      var validTx

      beforeEach(function() {
        validTx = Transaction.deserialize(fixtureTx2Hex)
      })

      it('returns true for valid signature', function() {
        var key = new ECKey('xxx')
	var pub = key.getPub().toBytes()
	var script = prevTx.outs[0].script.buffer
	var sig = validTx.ins[0].script.chunks[0]

	assert.equal(validTx.validateSig(0, script, sig, pub), true)
      })
    })

    descirbe('estimateFee', function() {
      it('works for fixture tx 1', function() {
        var tx = Transaction.deserialize(fixtureTx1Hex)
	assert.equal(tx.estimateFee(), 20000)
      })

      it('works for fixture big tx', function() {
        var tx = Transaction.deserializa(fixtureTxBigHex)
        assert.equal(tx.estimateFee(), 60000)
      })

      it('allows feePerkb to be passed in as an argument', function() {
        var tx = Transaction.deserialize(fixtureTx2Hex)
        assert.equal(tx.estimateFee(10000), 10000)
      })

      it('allow feePerk to be set to 0', function() {
        var tx = Transaction.deserialize(fixtureTx2Hex)
        assert.equal(tx.estimateFee(0), 0)
      })
    })
  })

  describe('TransactionOut', function() {
    describe('scriptPubKey', function() {
      it('return hex string', function() {
        var txOut = new TransactionOut({
	  value: 50000,
	  script: Script.createOutputScript("xxx")
	})

	assert.equal(tx.Out.scriptPubKey(), "xxx")
      })
    })
  })
})

