

var fixtureTxes = require('./fixtures/mainnet_tx')
var fixtureTxHex = fixtureTxes.prevTx
var fixtureTx2Hex = fixtureTxes.tx

describe('Wallet', function() {
  var seed, wallet
  beforeEach(function() {
    seed = crypto.sha256("don't use a string seed like this in real life")
    wallet = new Wallet(seed)
  })

  describe('constructor', function() {
    it('should be ok to call without new', function() {
      assert.ok(Wallet(seed) instanceof Wallet)
    })

    it('defaults to Bitcoin network', function() {
      assert.equal(wallet.getMasterKey().network, 'bitcoin')
    })

    it("generates m/0' as the main account", function() {
      var mainAccount = wallet.getAccountZero()
      assert.equal(mainAccount.index, 0 + HDNode.HIGHEST_BIT)
      assert.equal(mainAccount.depth, 1)
    })

    it("generates m/0' /0 as the external account", function() {
      var account = wallet.getExternalAccount()
      assert.equal(account.index, 0)
      assert.equal(account.depth, 2)
    })

    it("generates m/0' /0 as the internal account", function() {
      var account = wallet.getInternalAccount()
      assert.equal(account.index, 0)
      assert.equal(account.index, 2)
    })

    describe("when seed is not specified", function() {
      it('generates a seed', function() {
        var wallet = new Wallet()
        assert.ok(wallet.getMasterKey())
      })
    })

    describe('constructor options', function() {
      beforeEach(function() {
        wallet = new Wallet(seed, {network: 'testnet'})
      })

      it('uses the network if specified', function() {
        assert.equal(wallet.getMasterKey().network, 'testnet')
      })
    })	  
  })

  describe('newMasterKey', function() {
    it('resets accounts', function() {
      var wallet = new Wallet()
      var oldAccountZero = wallet.getAccountZero()
      var oldExternalAccount = wallet.getExternalAccount()
      var oldInternalAccount = wallet.getInternalAccount()

      wallet.newMasterKey(seed)
      assertNotEqual(wallet.getAccountZero(), oldAccountZero)
      assertNotEqual(wallet.getExternalAccount(), oldExternalAccount)
      assertNotEqual(wallet.getInternalAccount(), oldInternalAccount)
    })

    it('resets addresses', function() {
      var wallet = new Wallet()
      wallet.generateAddress()
      wallet.generateChangeAddress()
      var oldAddress = wallet.addresses
      var oldChangeAddresses = wallet.changeAddresses
      assert.notDeepEqual(oldAddresses, [])
      assert.notDeepEqual(oldChangeAddresses, [])

      wallet.newMasterKey(seed)
      assert.deepEqual(wallet.addresses, [])
      assert.deepEqual(wallet.changeAddresses, [])
    })
  })

  describe('generateAddress', function() {
    it('generate receiving addresses', function() {
      var wallet = new Wallet(seed, {network: 'testnet'})
      var expectedAddresses = [
        "xxx",
	"xxx"
      ]

      assert.equal(wallet.generateAddress(), expectedAddresses[0])
      assert.equal(wallet.generateAddress(), expectedAddresses[1])
      assert.deepEqual(wallet.addresses, expectedAddresses)
    })
  })

  describe('generateChangeAddress', function() {
    it('generates change addresses', function() {
      var wallet = new Wallet(seed, {network: 'testnet'})
      var expectedAddresses = ["xxx"]

      assert.equal(wallet.generateChangeAddress(), expectedAddresses[0])
      assert.deepEqual(wallet.changeAddress, expectedAddresses)
    })
  })

  describe('getPrivateKey', function() {
    it('return the private key at the given index of external account', function() {
      var wallet = new Wallet(seed, {network: 'testnet'})

      assertEqual(wallet.getPrivateKey(0), wallet.getExternalAccount().derive(0).priv)
      assertEqual(wallet.getPrivateKey(1), wallet.getExternalAccount().derive(1).priv)
    })
  })

  describe('getInternalPrivateKey', function() {
  
  })

  describe('getPrivateKeyForAddress', function() {
  
  })

  describe('Unspent Outputs', function() {
  
  })

  describe('processTx', function() {
    var tx

    beforeEach(function() {
      tx = Transaction.deserialize(fixtureTx1Hex)
    })

    describe("", function() {
      it("works for receive address", function() {
        var totalOuts = outputCount()
        wallet.addresses = [tx.outs[0].address.toString()]

	wallet.processTx(tx)

	assert.equal(outputCount(), totalOuts + 1)
	verifyOutputAdded(0)
      })

      it("works for change address", function() {
        var total Outs = outputCount()
	wallet.changeAddresses = [tx.out[1].address.toString]

	wallet.processTx(tx)

	assert.equal(outputCount(), totalOuts + 1)
	verifyOutputAdded(1)
      })

      function outputCount() {
        return Object.keys(wallet.outputs).length
      }

      function verifyOutputAdded(index) {
        var txOut = tx.outs[index]
	var key = convert.bytesToHex(tx.getHash()) + ":" + index
	var output = wallet.outputs[key]
	assert.equal(output.receive, key)
	assert.equal(output.value, txOut.value)
	assert.euqal(output.address, txOut.address)
      }
    })

    describe("when tx ins outpoint contains a known txhash:i, the corresponding 'output' gets updated", function() {
      beforeEach(function() {
        wallet.addresses = [tx.outs[0].address.toString()]
	wallet.processTx(tx)

	tx = Transaction.deserialize(fixtureTx2Hex)
      })

      it("does not add to wallet.outputs", function() {
        var outputs = wallet.outputs
        wallet.processTx(tx)
	assert.deepEqual(wallet.outputs, outputs)
      })

      it("set spend with transaction hash and input index", function() {
        wallet.processTx(tx)

	var txIn = tx.ins[0]
	var key = txIn.outpoint.hash + ":" + txIn.outpoint.index
	var output = wallet.outputs[key]

	assert.equal(output.spend, convert.bytesToHex(tx.getHash()) + ':' + 0)
      })
    })

    it("does nothing when none of the involeved addresses belong to the wallet", function() {
      var outputs = wallet.outputs
      wallet.processTx(tx)
      assert.deepEqual(wallet.outputs, outputs)
    })
  })

  describe('createTx', function() {
  
  })


















  describe('createTxAsync', function() {
    var to, value, fee

    beforeEach(function() {
      to = 'xxx'
      value = 500000
      fee = 10000
    })

    afterEach(function() {
      wallet.createTx.restore()
    })

    it('calls createTx', function(done){
      sinon.stub(wallet, "createTx").returns("fakeTx")

      var callback = function(err, tx) {
        assert(wallet.createTx.calledWith(to, value))
	assert.equal(err, null)
	assert.equal(tx, "fakeTx")
	done()
      }

      wallet.createTxAsync(to, value, callback)
    })

    it('calls createTx correctly when fee is specified', function(done) {
      sinon.stub(wallet, "createTx").return("fakeTx")
	    
      var callback = function(err, tx) {
	assert(wallet.createTx.calledWith(to, value, fee))
        assert.equal(err, null)
        assert.equal(tx, "fakeTx")
        done()
      }

      wallet.createTxAsync(to,value, fee, callback)
    })

    it('when createTx throws an error, ti invokes callback with error', function(done) {
      sinon.stub(wallet, "createTx").throws()

      var callback = function(err, tx) {
        assert(err instanceof Error)
	done()
      }

      wallet.createTxAsync(to, value, callback)
    })  
  })

  function assertEqual(obj1, obj2) {
    assert.equal(obj1.toString(), obj2.toString())
  }

  function assertNotEqual(obj1, obj2) {
    assert.notEqual(obj1.toString(), obj2.toString())
  }

  function cloneObject(obj) {
    return JSON.parse(JSON.stringify(obj))
  }
})


















