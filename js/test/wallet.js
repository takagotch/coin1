

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
    
  })



})


















