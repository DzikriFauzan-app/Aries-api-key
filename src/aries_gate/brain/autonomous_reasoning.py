def evaluate(text):
    t = text.lower()
    
    # Logic: Mekanika Orbital/Gravitasi
    if "bumi" in t and "matahari" in t:
        return (
            "[Aries Logic System]\n"
            "Analisis: Hierarki Gravitasi.\n"
            "Penalaran: Dalam sistem fisik, entitas dengan massa dominan mendikte geometri ruang bagi entitas di sekitarnya. "
            "Bumi tidak 'memilih' untuk mengelilingi Matahari, melainkan terjebak dalam kelengkungan ruang yang diciptakan oleh densitas Matahari.\n"
            "Kesimpulan: Orbit adalah manifestasi dari ketidakberdayaan massa kecil di hadapan massa masif."
        )

    # Logic: Kausalitas Umum (Kenapa A jadi B)
    if "mengapa" in t or "kenapa" in t:
        return (
            "[Aries Logic System]\n"
            "Analisis: Prinsip Kausalitas Universal.\n"
            "Penalaran: Setiap fenomena adalah output dari interaksi antara variabel input dan hukum lingkungan. "
            "Jika terjadi perubahan pada output, maka dipastikan terjadi destabilisasi atau aksi pada variabel input utama.\n"
            "Kesimpulan: Tidak ada kejadian acak; yang ada hanyalah hukum yang belum terpetakan."
        )
    return None
