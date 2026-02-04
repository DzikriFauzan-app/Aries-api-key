import json
import uuid
import time
import sys

REGISTRY = "iron_dome/approval/approval_registry.json"

def load():
    with open(REGISTRY) as f:
        return json.load(f)

def save(data):
    with open(REGISTRY, "w") as f:
        json.dump(data, f, indent=2)

def request(file):
    data = load()
    token = str(uuid.uuid4())
    data[token] = {
        "file": file,
        "time": time.time(),
        "approved": False
    }
    save(data)
    print("[IRON DOME] APPROVAL TOKEN:")
    print(token)

def confirm(token):
    data = load()
    if token not in data:
        print("[IRON DOME] ❌ TOKEN INVALID")
        sys.exit(1)

    data[token]["approved"] = True
    save(data)
    print("[IRON DOME] ✅ APPROVAL CONFIRMED")
