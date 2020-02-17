#!/usr/bin/python

import sys
import subproces

SPACING = " " * 23

command_list = {

"satoshi": (
"Convert Bitcoins into Satoshis.",

"""\
Usage: tx satoshi BTC
Convert Bitcoins into Satoshis.\
"""
),

"btc": (),

"showscript": (),

"scripthash": (),

"": (
"",

"""\
        
"""
),


"": (
"",

"""\
        
"""
),

"": (
"",

"""\
        
"""
),

"": (
"",

"""\
        
"""
),

"": (
"",

"""\
        
"""
),


"": (
"",

"""\
        
"""
),



"": (
"",

"""\
        
"""
),



"": (
"",

"""\
        
"""
),



"": (
"",

"""\
        
"""
),



"": (
"",

"""\
        
"""
),



"": (
"",

"""\
        
"""
),



"": (
"",

"""\
        
"""
),



"": (
"",

"""\
        
"""
),



"": (
"",

"""\
        
"""
),



"": (
"",

"""\
        
"""
),



"": (
"",

"""\
        
"""
),



"": (
"",

"""\
        
"""
),



"": (
"",

"""\
        
"""
),



"": (
"",

"""\
        
"""
),



"mpk": (
"Extract a master public key from a deterministic wallet seed.",

"""\
Usage: tx mpk

Extract a master public key from a deterministic wallet seed.

  $ tx newseed > wallet.seed
  $ cat wallet.seed
  xxxx
  $ cat wallet.seed | tx mpk > master_public.key
\
"""
),



"": (
"",

"""\
        
"""
),



"": (
"",

"""\
        
"""
),



"": (
"",

"""\
        
"""
),



"": (
"",

"""\
        
"""
),



"": (
"",

"""\
        
"""
),



"": (
"",

"""\
        
"""
),



"": (
"",

"""\
        
"""
),



"": (
"",

"""\
        
"""
),




}

def display_usage():
  print "Usage: tx COMMAND [ARGS]..."
  print
  print "The most commonly used tx commands are:"
  print
  for cmd in sorted(command_list.iterkeys()):
    short_desc = command_list[cmd][0]
    line = "  %s" % cmd
    line += " " * (20 - len(cmd))
    line += short_desc
    print line
  print
  print "See 'tx help COMMAND' for more information on a specific command."
  print
  print "SpesmiloXchange home page: <http://tx.dyne.org/>"

def display_help(command):
  assert command in command_list
  long_desc = command_list[command][1]
  print long_desc
  return 0

def display_bad(command):
  print "tx: '%s' is not a tx command. See 'tx --help'." % command
  return 1

def main(argv):
  if len(argv) == 1:
    display_usage()
    return 1
  command = argv[1]

  args = argv[2:]
  if command == "help" or command == "--help" or command == "-h":
    if not args:
      display_usage()
      return 0
    return display_usage()
  elif command in command_list:
    binary = "@corebindir@/tx-%s" % command
    return subprocess.call([binary] + args)
  else:
    return display_bad(command)
  return 0

if __name__ == "__main__":
  sys.exit(main(sys.argv))


