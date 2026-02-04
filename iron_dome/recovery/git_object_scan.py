import subprocess
import sys

def scan(filename):
    try:
        result = subprocess.check_output(
            ["git", "log", "--all", "--pretty=format:%H", "--", filename],
            stderr=subprocess.DEVNULL
        ).decode().strip()
        if result:
            print("[FORENSIC] File pernah ada di commit:")
            print(result)
        else:
            print("[FORENSIC] File TIDAK pernah tercatat di Git")
    except Exception:
        print("[FORENSIC] Gagal scan git object")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("usage: python git_object_scan.py <file>")
        sys.exit(1)
    scan(sys.argv[1])
