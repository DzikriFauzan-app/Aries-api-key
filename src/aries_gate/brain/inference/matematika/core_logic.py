import re
def execute(q):
    # Logika untuk menangani berbagai jumlah alphabet dan angka
    alphabets = re.findall(r'[a-zA-Z]', q)
    numbers = re.findall(r'\d+', q)
    return f"Terdeteksi {len(alphabets)} variabel dan {len(numbers)} nilai. Memulai perhitungan simultan..."
