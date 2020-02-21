
var assert = require('assert')
var base58 = require('./base58')
var crypto = require('./crypto')

function encode(buffer, version) {
  version = version || 0

  var version = new Buffer([version])
  var payload = new Buffer(buffer)

  var message = Buffer.concat([version, payload])
  var checksum = crypto.hash256(message).slice(0, 4)

  return base58.encode(Buffer.concat([
    message,
    checksum
  ]))
}

function decode(string) {
  var buffer = base58.decode(string)

  var message = buffer.slice(0, -4)
  var checksum = buffer.slice(-4)
  var newChecksum = crypto.hash256(message).slice(0, 4)

  assert.deepEqual(newChecksum, checksum)

  var version = message.readUInt8(0)
  var payload = message.slice(1)

  return {
    version: version,
    payload: payload,
    checksum: checksum
  }
}

module.expors = {
  encode: encode,
  decode: decode
}

