import ast

def count_nodes(path: str) -> int:
    with open(path, "r", encoding="utf-8") as f:
        tree = ast.parse(f.read())
    return len(list(ast.walk(tree)))

def validate(old_path: str, new_path: str):
    old_nodes = count_nodes(old_path)
    new_nodes = count_nodes(new_path)

    if new_nodes < old_nodes * 0.85:
        raise Exception("IRON DOME: AST LOGIC LOSS DETECTED")
    return True
