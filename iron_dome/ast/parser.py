import ast

def parse(code: str):
    try:
        return ast.parse(code)
    except SyntaxError:
        return None
