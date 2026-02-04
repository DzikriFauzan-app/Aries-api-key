import json
from iron_dome.ledger.hashchain import compute_entry

def verify(path):
    prev = "GENESIS"
    with open(path, "r") as f:
        for i, line in enumerate(f):
            entry = json.loads(line)
            if entry["hash_prev"] != prev:
                raise Exception(f"Ledger broken at line {i}")
            if compute_entry({k:v for k,v in entry.items() if k!="hash_curr"}) != entry["hash_curr"]:
                raise Exception(f"Hash mismatch at line {i}")
            prev = entry["hash_curr"]
    return True
