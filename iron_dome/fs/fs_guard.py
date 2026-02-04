import os
import shutil

# File-level delete
def safe_remove(path: str):
    if not os.path.exists(path):
        return

    if os.path.isdir(path):
        raise RuntimeError("safe_remove tidak boleh hapus directory")

    os.remove(path)

# Directory-level recursive delete (ANTI SEMBARANG)
def safe_rmtree(path: str):
    if not os.path.exists(path):
        return

    # HARD SAFETY — tidak boleh root / home
    forbidden = ["/", "/data", "/data/data", os.path.expanduser("~")]
    abs_path = os.path.abspath(path)

    for f in forbidden:
        if abs_path == f or abs_path.startswith(f + "/"):
            raise RuntimeError(f"IRON DOME BLOCKED PATH: {abs_path}")

    shutil.rmtree(abs_path)
