import glob, importlib, re

def evaluate(text):
    # Scan semua rumus files
    rumus_files = glob.glob("math/rumus*.py")
    for rumus_file in rumus_files:
        module_name = rumus_file.split('/')[-1].replace('.py', '')
        try:
            module = importlib.import_module(f"math.{module_name}")
            patterns = module.test_patterns()
            for pattern, answer in patterns.items():
                if pattern in text or re.search(re.escape(pattern), text, re.IGNORECASE):
                    return answer
        except:
            continue
    return None
