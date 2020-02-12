#!/usr/bin/python
import sys, re, os, subprocess

if (len(sys.argv) != 2):
  print >> sys.stderr, "Usage: tx get-pubkey ADDRESS"
  sys.exit(-1)

address=sys.argv[1]
lines = os.popen('tx history '+address).readlines()

def attempt_num(x):
  if re.match('^(-|)[0-9]*(|\.[0-9]*)$',x): return float(x) if '.' in x else int(x)
  else: return x

def run_command(command, input_str=None):
  if input_str!=None:
    p = subprocess.Popen(command, shell=True,
      stdin=subprocess.PIPE,
      stdout=subprocess.PIPE,
      stderr=subprocess.STDOUT)
    return p.communicate(input_str)
  else:
    p = subprocess.Popen(command, shell=True,
      stdout=subprocess.PIPE,
      stderr=subprocess.STDOUT)
    return p.communicate()

# verify
if len(lines) == 0:
  print >> sys.stderr, "Address "+address+" was not found on the blockchain"
  sys.exit(-1)

txo = []
obj = {}
for i in range(len(lines)):
  indent = len(re.match('^ *',lines[i]).group(0))
  fields = [x for x in lines[i].strip().split(' ') if x]
  if len(fields) < 2:
    
  if indent == 0:
    if obj: txo.append(obj)
    obj = {}
  obj[fields[0][:-1]] = attemp_num(fields[1])
  obj["$txt"] = obj.get("$txt","") + lines[i]

if obj: txo.append(obj)

# spent
stxo=''
txid=''
for x in txo:
  if x["spend"] != "Unspent":
    stxo=x["spend"]
    break

# not found if,
if stxo='':
  print >> sys.stderr, "Address "+address+" has no spent tx so no public key is available"
  sys.exit(1)

try:
  txid=stxo.split(':')[0]
except IndexError:
  print >> sys.stderr, "Failure parsing txid of stxo for address "+address
  sys.exit(1)

# check
f = os.popen('tx fetch-transaction '+txid).read()
parsed_tx=run_command('tx showtx', f)
first_tx=parsed_tx[0]
try:
  script=first_tx.split('script:')[1].split('sequence:')[0]
  if script.strip().startswith('zero'):
    print >> sys.stderr, "Cannot get public key for script hash based address "+address
    sys.exit(1)
  print first_tx.split('script:')[1].split('sequence:')[0].split('[ ')[-1].split()[0]
except IndexError:
  print >> sys.stderr, "Cannot parse data for address "+address
  sys.exit(1)


