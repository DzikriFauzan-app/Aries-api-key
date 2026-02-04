import re

def process(query):
    try:
        # 1. Normalisasi bahasa ke operator
        q = query.lower()
        replacements = {
            'kali': '*',
            'x': '*',
            'bagi': '/',
            'tambah': '+',
            'kurang': '-'
        }
        for word, op in replacements.items():
            q = q.replace(word, op)
            
        # 2. Bersihkan karakter sampah kecuali angka dan operator
        clean = re.sub(r'[^0-9\+\-\*\/\(\)\.]', '', q)
        
        # 3. Validasi: Jangan sampai kosong atau hanya angka nempel (seperti 32)
        if not clean or clean.isdigit():
            if clean.isdigit() and len(clean) > 1:
                return "🧮 [MATH] Error: Operator hilang (terdeteksi angka nempel)."
            return "🧮 [MATH] Input tidak valid."

        # 4. Kalkulasi
        result = eval(clean)
        return f"🧮 [MATH] Hasil: **{result}**"
        
    except Exception as e:
        return f"🧮 [MATH] Error: {str(e)}"
