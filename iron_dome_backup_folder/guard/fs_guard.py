import os
import sys
from iron_dome.guard.ast_guard import validate_ast_upgrade

def request_delete(old_path: str, new_path: str | None = None):
    if not os.path.exists(old_path):
        print(f"[IRON DOME] ❌ FILE TIDAK DITEMUKAN: {old_path}")
        sys.exit(1)

    if not new_path:
        print("[IRON DOME] ❌ FILE DILINDUNGI — TIDAK BOLEH DIHAPUS TANPA PENGGANTI")
        sys.exit(1)

    if not os.path.exists(new_path):
        print(f"[IRON DOME] ❌ FILE PENGGANTI TIDAK DITEMUKAN: {new_path}")
        sys.exit(1)

    if not validate_ast_upgrade(old_path, new_path):
        print("[IRON DOME] ❌ DOWNGRADE LOGIC TERDETEKSI — DELETE DITOLAK")
        sys.exit(1)

    print("[IRON DOME] 🛡️ AST VALIDATION LULUS")
    os.remove(old_path)
    print("[IRON DOME] ✅ DELETE APPROVED")
