import ast
import os
import time

def file_score(path: str) -> int:
    score = 0

    if not os.path.exists(path):
        return 0

    # 1. Syntax valid (WAJIB)
    try:
        with open(path, "r", encoding="utf-8") as f:
            ast.parse(f.read())
        score += 40
    except Exception:
        return 0  # syntax error = sampah

    # 2. Ukuran file (kode nyata, bukan stub)
    size = os.path.getsize(path)
    if size > 300:
        score += 10

    # 3. Umur file (stabilitas historis)
    age_days = (time.time() - os.path.getmtime(path)) / 86400
    if age_days > 7:
        score += 10
    if age_days > 30:
        score += 10

    # 4. Digunakan runtime (heuristik import)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
        if "def " in content or "class " in content:
            score += 10

    return score
