import sys
import os

sys.path.insert(0, os.path.expanduser("~/neo_internal"))

from core.world_registry import WorldRegistry

print("\n🛰️ [ARIES GATE] LAPORAN STATUS DUNIA:")
regions = WorldRegistry.get_all()

if not regions:
    print("⚪ Registry masih kosong. Harap jalankan FEAC dahulu.")
else:
    for name, data in regions.items():
        st = data.get("status", "UNKNOWN")
        icon = "🔥" if st == "CRISIS" else "🟡" if st == "THREATENED" else "🟢"
        print(f"{icon} {name}: {st}")
