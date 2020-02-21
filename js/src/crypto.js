

var CryptoJS = require('crypto-js')
var crypto = require('crypto')
var convert = require('./convert')

function hash160(buffer) {
  if (!Buffer.isBuffer(buffer)) buffer = new Buffer(buffer)

  var step1 = sha256(buffer)

  var step2a = convert.bytesToWordArray(step1)
  var step2b = CryptoJS.RIPEMD160(step2a)

  return new Buffer(convert.wordArrayToBytes(step2b))
}

function hash256(buffer) {
  if (!Buffer.isBuffer(buffer)) buffer = new Buffer(buffer)

  return sha256(sha256(buffer))
}

function sha1(buffer) {
  if (!Buffer.isBuffer(buffer)) buffer = new Buffer(buffer)

  return crypto.createHash('sha1').update(buffer).digest()
}

function sha256(buffer) {
  if (!Buffer.isBuffer(buffer)) buffer = new Buffer(buffer)

  return crypto.createHash('sha256').update(buffer).digest()
}

module.exports = {
  sha1: sha1,
  sha256: sha256,
  hash160: hash160,
  hash256: hash256
}

