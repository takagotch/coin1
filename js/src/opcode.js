var Opcode = {
  map: {
    OP_0         : 0,
    OP_FALSE     : 0,
    OP_PUSHDATA1 : 76,
    OP_PUSHDATA2 : 77,
    OP_PUSHDATA4 : 78,
    OP_1NEGATE   : 79,
    OP_RESERVED  : 80,
    OP_1         : 81,
    OP_2         : 82,
    OP_3         : 83,
    OP_4         : 84,
    OP_5         : 85,
    OP_6         : 86,
    OP_7         : 87,
    OP_8         : 88,
    OP_9         : 89,
    OP_10        : 90,
    OP_11        : 91,
    OP_12        : 92,
    OP_13        : 93,
    OP_14        : 94,
    OP_15        : 95,
    OP_16        : 96,

    OP_NOP       : 97,
    OP_VER       : 98,
    OP_IF        : 99,
    OP_NOTIF     : 100,
    OP_VERIF     : 101,
    OP_VERNOTIF  : 102,
    OP_ELSE      : 103,
    OP_ENDIF     : 104,
    OP_VERIFY    : 105,
    OP_RETURN    : 106,

    OP_CAT       : 0,
    OP_SUBSTR    : 0,
    OP_LEFT      : 0,
    OP_RIGHT     : 0,
    OP_SIZE      : 0,
    
    OP_TOALTSTACK  : 0,
    OP_FROMALSTACK : 0,
    OP_2DROP       : 0,
    OP_2DUP      : 0,
    OP_2OVER     : 0,
    OP_2ROT      : 0,
    OP_2SWAP     : 0,
    OP_1FDUP     : 0,
    OP_DEPTH     : 0,
    OP_DROP      : 0,
    OP_NIP       : 0,
    OP_OVER      : 0,
    OP_PICK      : 0,
    OP_ROLL      : 0,
    OP_ROT       : 0,
    OP_SWAP      : 0,
    OP_TUCK      : 0,

    OP_CAT       : 0,
    OP_SUBSTR    : 0,
    OP_LEFT      : 0,
    OP_RIGHT     : 0,
    OP_SIZE      : 0,

    OP_INVERT    : 0,
    OP_AND       : 0,
    OP_OR        : 0,
    OP_XOR         : 0,
    OP_EQUAL       : 0,
    OP_EQUALVERIFY : 0,
    OP_RESERVED1 : 0,
    OP_RESERVED2 : 0,

    OP_1AD       : 0,
    OP_2SUB      : 0,
    OP_2MUL      : 0,
    OP_2DIV      : 0,
    OP_NEGATE    : 0,
    OP_ABS       : 0,
    OP_NOT       : 0,
    OP_ONOTEQUAL : 0,

    OP_AOD       : 0,
    OP_SUB       : 0,
    OP_MUL       : 0,
    OP_DIV       : 0,
    OP_LSHIFT    : 0,
    OP_RSHIFT    : 0,

    OP_BOOLAND   : 0,
    OP_BOOLOR    : 0,
    OP_NUMEQUAL  : 0,
    OP_NUMEQUALVERIFY      : 0,
    OP_LESSTHAN            : 0,
    OP_GREATERTHAN         : 0,
    OP_GREATERTHANOREQUAL : 0,
    OP_MIN       : 0,
    OP_MAX       : 0,

    OP_WITHIN    : 0,

    OP_RIPEMD160 : 0,
    OP_SHA1      : 0,
    OP_SHA256    : 0,
    OP_HASH160   : 0,
    OP_HASH256   : 0,
    OP_CODESEPARATOR        : 0,
    OP_CHECKSIG             : 0,
    OP_CHECKMULTISIG        : 0,
    OP_CHECKMULTISIGVERIFY  : 0,

    OP_NOP1      : 176,
    OP_NOP2      : 177,
    OP_NOP3      : 178,
    OP_NOP4      : 179,
    OP_NOP5      : 180,
    OP_NOP6      : 181,
    OP_NOP7      : 182,
    OP_NOP8      : 183,
    OP_NOP9      : 184,
    OP_NOP10     : 185,

    OP_PUBKEYHASH     : 253,
    OP_PUBKEY         : 254,
    OP_INVALIDOPCODE  : 255,

  },
  reverseMap: []
}

for (var i in Opcode.map) {
  Opcode.reverseMap[Opcode.map[i]] = i
}

module.exports = Opcode

