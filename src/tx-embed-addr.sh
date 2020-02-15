#!/bin/bash
read INPUT
DECODED_ADDR=$(echo $INPUT | tx ripemd-hash)
SCRIPT=$(tx rawscript duphash160 [ $DECODE_ADDR ] equalverify checksig)
HASH=$(echo $SCRIPT | sx ripemd-hash)
tx encode-addr $HASH

