import sys
from iron_dome.recovery.git_object_scan import scan
from iron_dome.recovery.ledger_trace import trace

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("usage: python recover.py <file>")
        sys.exit(1)

    file = sys.argv[1]
    print("=== IRON DOME FORENSIC RECOVERY ===")
    scan(file)
    trace(file)
