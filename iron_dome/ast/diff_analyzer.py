import ast
from iron_dome.ast.parser import parse

CRITICAL_CALLS = {
    "authorize",
    "validateLicense",
    "auditLog",
    "usageMeter"
}

def extract_calls(tree):
    calls = set()
    for node in ast.walk(tree):
        if isinstance(node, ast.Call):
            if isinstance(node.func, ast.Name):
                calls.add(node.func.id)
    return calls

def is_dangerous(before, after):
    if not before or not after:
        return False

    lost = extract_calls(before) - extract_calls(after)
    return bool(lost & CRITICAL_CALLS)
