import glob, importlib, re, os
sys.path.insert(0, os.path.dirname(__file__))

def evaluate(text):
    rumus_files = glob.glob("rumus*.py")
    for rumus_file in rumus_files:
        module_name = rumus_file.replace('.py', '')
        try:
            module = importlib.import_module(module_name)
            patterns = module.test_patterns()
            for pattern, answer in patterns.items():
                if pattern in text:
                    return answer
        except:
            continue
    return None
