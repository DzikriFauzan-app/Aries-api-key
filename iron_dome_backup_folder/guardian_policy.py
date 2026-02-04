PROTECTED_PATHS = [
    "/src/",
    "/engine/",
    "/security/",
    "/iron_dome/",
]

def auto_protect(path: str) -> bool:
    return any(p in path for p in PROTECTED_PATHS)
