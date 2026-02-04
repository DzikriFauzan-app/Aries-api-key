import json
import os

REGISTRY = "iron_dome/core/registry.json"

def load_registry():
    if not os.path.exists(REGISTRY):
        return {}
    with open(REGISTRY, "r") as f:
        return json.load(f)

def is_protected(path: str) -> bool:
    reg = load_registry()
    return reg.get(path, {}).get("protected", False)

def register_protected(path: str, reason: str):
    reg = load_registry()
    reg[path] = {
        "protected": True,
        "reason": reason
    }
    with open(REGISTRY, "w") as f:
        json.dump(reg, f, indent=2)
