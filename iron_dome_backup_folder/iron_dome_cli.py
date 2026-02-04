import sys, os
sys.path.insert(0, os.path.abspath(os.getcwd()))

import sys
from iron_dome.guard.fs_guard import request_delete

def help():
    print("""
IRON DOME FILE GUARD

Usage:
  python iron_dome_cli.py <OLD_FILE> [NEW_FILE]

Rules:
- OLD_FILE wajib ada
- TANPA NEW_FILE → DITOLAK
- NEW_FILE wajib ada & lolos validasi

Examples:
  python iron_dome_cli.py src/a.py src/a_v2.py
""")
    sys.exit(0)

if len(sys.argv) == 2 and sys.argv[1] == "--help":
    help()

if len(sys.argv) < 2:
    help()

old = sys.argv[1]
new = sys.argv[2] if len(sys.argv) > 2 else None

request_delete(old, new)
