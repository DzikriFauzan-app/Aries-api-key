import hashlib

def hash_entry(prev_hash: str, payload: str) -> str:
    h = hashlib.sha256()
    h.update((prev_hash + payload).encode())
    return h.hexdigest()
