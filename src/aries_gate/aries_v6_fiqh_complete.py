def get_response(msg):
    m = msg.lower()
    if "wudhu" in m:
        return (
            "Wudhu secara bahasa berarti bersih dan indah. Secara syara' adalah membasuh anggota tubuh tertentu "
            "dengan air disertai niat. Rukun Wudhu ada 6: 1. Niat, 2. Membasuh wajah, 3. Membasuh kedua tangan "
            "sampai siku, 4. Mengusap sebagian kepala, 5. Membasuh kedua kaki sampai mata kaki, 6. Tertib."
        )
    if "shalat" in m:
        return "Shalat adalah ibadah wajib bagi umat Islam yang diawali takbiratul ihram dan diakhiri salam."
    return "Modul Fiqh Aktif: Menunggu keyword (Wudhu, Shalat, Niat)."
