import os
import shutil
import time
import ast

VAULT_DIR = "iron_dome/.vault"

CRITICAL_DIRS = [
    "src",
    "core",
    "engine",
    "security",
    "guardian",
    "iron_dome"
]

CRITICAL_KEYWORDS = [
    "core",
    "engine",
    "gate",
    "guardian",
    "kernel",
    "security"
]

def normalize(path):
    return os.path.abspath(os.path.expanduser(path))

def is_critical(path):
    p = normalize(path)
    for d in CRITICAL_DIRS:
        if f"/{d}/" in p:
            return True
    for k in CRITICAL_KEYWORDS:
        if k in os.path.basename(p):
            return True
    return False

def analyze_python(path):
    try:
        with open(path, "r", encoding="utf-8") as f:
            tree = ast.parse(f.read())
        funcs = len([n for n in ast.walk(tree) if isinstance(n, ast.FunctionDef)])
        imports = len([n for n in ast.walk(tree) if isinstance(n, ast.Import)])
        imports += len([n for n in ast.walk(tree) if isinstance(n, ast.ImportFrom)])
        return funcs, imports
    except Exception:
        return 0, 0

def backup_file(path):
    os.makedirs(VAULT_DIR, exist_ok=True)
    ts = time.strftime("%Y%m%d-%H%M%S")
    name = os.path.basename(path)
    dst = os.path.join(VAULT_DIR, f"{name}.{ts}.bak")
    shutil.copy2(path, dst)

def request_delete(old_path, new_path=None):
    old_path = normalize(old_path)
    if not os.path.exists(old_path):
        print(f"[IRON DOME] ❌ FILE TIDAK DITEMUKAN: {old_path}")
        return

    critical = is_critical(old_path)

    if new_path:
        new_path = normalize(new_path)
        if not os.path.exists(new_path):
            print(f"[IRON DOME] ❌ FILE PENGGANTI TIDAK ADA: {new_path}")
            return

        old_size = os.path.getsize(old_path)
        new_size = os.path.getsize(new_path)

        old_funcs, _ = analyze_python(old_path)
        new_funcs, _ = analyze_python(new_path)

        if new_size < old_size * 0.8:
            print("[IRON DOME] ❌ PENGGANTI LEBIH KECIL SIGNIFIKAN")
            return

        if new_funcs < old_funcs * 0.8:
            print("[IRON DOME] ❌ JUMLAH FUNGSI TURUN DRASTIS")
            return

        print("[IRON DOME] 🛡️ VALIDASI PENGGANTI LULUS")

    else:
        if critical:
            print("[IRON DOME] ❌ FILE DILINDUNGI — BUTUH PENGGANTI")
            return

    backup_file(old_path)
    os.remove(old_path)
    print("[IRON DOME] ✅ DELETE APPROVED (BACKUP TERSIMPAN)")
