import json
import os
import time
from iron_dome.ledger.hashchain import hash_entry

LEDGER_PATH = os.path.expanduser("~/.iron_dome_ledger.json")

def _load():
    if not os.path.exists(LEDGER_PATH):
        return []
    with open(LEDGER_PATH, "r") as f:
        return json.load(f)

def _save(data):
    with open(LEDGER_PATH, "w") as f:
        json.dump(data, f, indent=2)

def append(actor: str, action: str, target: str):
    data = _load()
    prev_hash = data[-1]["hash"] if data else "GENESIS"
    payload = f"{time.time()}|{actor}|{action}|{target}"
    h = hash_entry(prev_hash, payload)

    data.append({
        "time": time.time(),
        "actor": actor,
        "action": action,
        "target": target,
        "prev": prev_hash,
        "hash": h
    })
    _save(data)
