import re

def solve(query):
    try:
        parts = query.split("=")
        left, right = parts[0].strip(), int(parts[1].strip())
        coeff_match = re.search(r'(\d+)[a-zA-Z]', left)
        coeff = int(coeff_match.group(1)) if coeff_match else 1
        # Menangkap konstanta dengan tandanya
        constants = re.findall(r'([+-]?\s*\d+)(?![a-zA-Z])', left)
        left_sum = sum(int(c.replace(" ", "")) for c in constants)
        
        result = (right - left_sum) / coeff
        return int(result) if result.is_integer() else result
    except:
        return None
