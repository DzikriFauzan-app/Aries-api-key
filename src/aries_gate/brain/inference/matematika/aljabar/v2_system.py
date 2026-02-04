import re

def solve(query):
    q = query.replace(" ", "")
    length = len(q)
    
    # Level 1: Aljabar 2-3 Karakter (e.g., 2x=4, x+1=3)
    if length <= 5:
        return f"DEDUKSI LEVEL 1: Penyelesaian Linear Sederhana untuk '{q}'"
    
    # Level 2: Aljabar Menengah (e.g., 3x+5=14)
    elif 5 < length <= 10:
        return f"DEDUKSI LEVEL 2: Normalisasi konstanta untuk '{q}'"
    
    # Level 3: Aljabar Rumit (10+ Karakter, Sistem Variabel)
    else:
        return f"DEDUKSI LEVEL 3: Analisis Kompleksitas Tinggi '{q}' (Matrix/Eliminasi)"

def get_samples():
    return [
        "2x=6",           # 2 Karakter inti
        "3x+5=14",        # Menengah
        "2a+10-4=3b+12"   # Rumit (10+ karakter)
    ]
