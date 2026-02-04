import sys
import os

cmd = " ".join(sys.argv).lower()

# === ABSOLUTE SAFE COMMANDS ===
if " checkout -- " in cmd or cmd.startswith("checkout --"):
    sys.exit(0)

if " restore " in cmd or cmd.startswith("restore"):
    sys.exit(0)

# === HARD BLOCK COMMANDS ===
if "reset --hard" in cmd:
    print("[IRON DOME] ❌ git reset --hard DIBLOKIR")
    sys.exit(1)

if "clean -fd" in cmd or "clean -fdx" in cmd:
    print("[IRON DOME] ❌ git clean -fdx DIBLOKIR")
    sys.exit(1)

# === git rm tetap lewat fs_guard ===
sys.exit(0)
