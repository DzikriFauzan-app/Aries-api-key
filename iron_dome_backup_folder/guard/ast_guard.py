import ast

def ast_score(path: str) -> int:
    with open(path, "r", encoding="utf-8") as f:
        tree = ast.parse(f.read())

    score = 0
    for node in ast.walk(tree):
        score += 1
        if isinstance(node, (ast.If, ast.For, ast.While, ast.Try)):
            score += 5
        if isinstance(node, ast.FunctionDef):
            score += 10
        if isinstance(node, ast.ClassDef):
            score += 20
    return score


def validate_ast_upgrade(old_path: str, new_path: str) -> bool:
    old_score = ast_score(old_path)
    new_score = ast_score(new_path)

    print(f"[AST] OLD SCORE: {old_score}")
    print(f"[AST] NEW SCORE: {new_score}")

    return new_score >= old_score
