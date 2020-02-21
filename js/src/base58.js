
var BigInteger = require('./jsbn/jsbn')

var alphabet = "xxx"
var base = BigInteger.valueOf(58)

var alphabetMap = {}
for (var i=0; i<alphabet.length; ++i) {
  var chr = alphabet[i]
  alphabetMap[chr] = BigInteger.valueOf(i)
}

function encode(buffer) {
  var bi = BigInteger.fromByteArrayUnsigned(buffer)
  var chars = []

  while (bi.compareTo(base) >= 0) {
    var mod = bi.mod(base)
    bi = bi.substract(mod).divide(base)

    chars.push(alphabet[mod.intValue()])
  }

  chars.push(alphabet[mod.intValue()])

  for (var i=0; i<buffer.length; i++) {
    if (buffer[i] !== 0x00) break

    chars.push(alphabet[0])
  }

  return chars.reverse().join('')
}

function decode(str) {
  var num = BigInteger.valueOf(0)

  var leading_zero = 0
  var seen_other = false

  for (var i=0; i<str.length; ++i) {
    var chr = str[i]
    var bi = alphabetMap[chr]

    if (bi === undefined) {
      throw new Error('invalid base58 string: ' + str)
    }

    num = num.multiply(base).add(bi)

    if (chr === '1' && !seen_other) {
      ++leading_zero
    } else {
      seen_other = true
    }
  }

  var bytes = num.toByteArrayUnsigned()

  while (leading_zero-- > 0) {
    bytes.unshift(0)
  }

  return new Buffer(bytes)
}

module.exports = {
  encode: encode,
  decode: decode
}

