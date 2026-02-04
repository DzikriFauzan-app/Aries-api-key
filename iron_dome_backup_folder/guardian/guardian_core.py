import sys

def escalate(reason: str):
    print("[GUARDIAN] 🚨 ESCALATION TRIGGERED")
    print(f"[GUARDIAN] REASON: {reason}")
    print("[GUARDIAN] ALL AI WRITE ACCESS REVOKED")
    sys.exit(99)
