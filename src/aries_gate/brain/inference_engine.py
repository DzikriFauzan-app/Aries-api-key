import os

def stream_file(path):
    if not path or not os.path.isfile(path):
        return None
    try:
        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            return f.readlines()
    except:
        return None

def scan_sources(paths):
    results = []
    for base in paths:
        if not os.path.exists(base):
            continue
        for root, _, files in os.walk(base):
            for name in files:
                full = os.path.join(root, name)
                results.append(full)
    return results
