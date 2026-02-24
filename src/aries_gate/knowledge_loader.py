import os

# === KNOWLEDGE SOURCES (FIXED PATHS) ===
GAME_FILES_DIR = "/sdcard/Buku saya/Fauzan engine/File khusus game"
BRAIN_DATA_DIR = "/sdcard/Buku saya/Fauzan engine/NeoEngine/aries/brain_data"

def _scan_py_files(base_dir):
    collected = []
    for root, _, files in os.walk(base_dir):
        for f in files:
            if f.endswith(".py"):
                collected.append(os.path.join(root, f))
    return collected

def load_all_knowledge():
    knowledge = {
        "file_khusus_game": [],
        "brain_data": []
    }

    if os.path.isdir(GAME_FILES_DIR):
        knowledge["file_khusus_game"] = _scan_py_files(GAME_FILES_DIR)

    if os.path.isdir(BRAIN_DATA_DIR):
        knowledge["brain_data"] = _scan_py_files(BRAIN_DATA_DIR)

    return knowledge

if __name__ == "__main__":
    data = load_all_knowledge()
    print("=== LOADED KNOWLEDGE ===")
    for k, v in data.items():
        print(k, len(v))
        for f in v:
            print(" -", f)
