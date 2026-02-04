import os

# =========================================================
# IRON DOME — GIT GUARD
# DEV BYPASS (TEMPORARY)
# =========================================================

if os.environ.get("IRON_DOME_DISABLED") == "1":
    def intercept(cmd: str):
        return True
else:
    from iron_dome.ledger.ledger import append

    BLOCKED = [
        "reset --hard",
        "clean -fdx"
    ]

    def intercept(cmd: str):
        for b in BLOCKED:
            if b in cmd:
                append("human", "git_blocked", cmd)
                raise Exception("IRON DOME: GIT DESTRUCTIVE BLOCKED")
        return True
