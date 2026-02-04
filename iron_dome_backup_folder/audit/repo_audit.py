import os
import subprocess
import json
from iron_dome.guard.ast_guard import ast_score

REPO_ROOT = os.getcwd()

def git(cmd):
    return subprocess.check_output(cmd, shell=True).decode().strip()

def list_branches():
    out = git("git branch --all")
    return [b.strip().replace("* ", "") for b in out.splitlines()]

def list_files(branch):
    git(f"git checkout {branch} --quiet")
    files = []
    for root, _, fs in os.walk("src"):
        for f in fs:
            if f.endswith(".py"):
                files.append(os.path.join(root, f))
    return files

def audit_branch(base, target):
    report = []
    git(f"git checkout {base} --quiet")
    base_files = list_files(base)

    git(f"git checkout {target} --quiet")
    target_files = list_files(target)

    common = set(base_files) & set(target_files)

    for f in common:
        try:
            base_score = ast_score(f)
            target_score = ast_score(f)
            if target_score < base_score:
                report.append({
                    "file": f,
                    "base": base_score,
                    "target": target_score,
                    "status": "DOWNGRADE"
                })
        except Exception:
            continue

    return report

def main():
    branches = list_branches()
    base = "main"
    full_report = {}

    for br in branches:
        if br == base:
            continue
        print(f"[AUDIT] Checking {br}")
        result = audit_branch(base, br)
        if result:
            full_report[br] = result

    with open("iron_dome_audit_report.json", "w") as f:
        json.dump(full_report, f, indent=2)

    print("[IRON DOME] AUDIT SELESAI → iron_dome_audit_report.json")

if __name__ == "__main__":
    main()
