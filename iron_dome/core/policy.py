CRITICAL_PATHS = [
    "src/",
    "engine/",
    "core/",
    "iron_dome/",
    "security/",
    "auth/",
    "audit/"
]

CRITICAL_ACTIONS = [
    "git_reset_hard",
    "git_clean_fdx",
    "rm_recursive",
    "chmod_recursive"
]

def is_protected(path: str) -> bool:
    return any(path.startswith(p) for p in CRITICAL_PATHS)
