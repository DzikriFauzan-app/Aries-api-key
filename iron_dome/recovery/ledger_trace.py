import json
import os
import sys

LEDGER = os.path.expanduser("~/.iron_dome_ledger.json")

def trace(path):
    if not os.path.exists(LEDGER):
        print("[FORENSIC] Ledger tidak ditemukan")
        return

    data = json.load(open(LEDGER))
    hits = [e for e in data if path in e["target"]]

    if not hits:
        print("[FORENSIC] Tidak ada jejak ledger")
        return

    print("[FORENSIC] JEJAK LEDGER:")
    for e in hits:
        print(f'{e["time"]} | {e["actor"]} | {e["action"]} | {e["target"]}')

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("usage: python ledger_trace.py <file>")
        sys.exit(1)
    trace(sys.argv[1])
