def process(query):
    query = query.lower()
    if 'wudhu' in query and 'air laut' in query:
        return "🕌 [FIQIH] Air laut itu suci airnya dan halal bangkainya (HR. Arba'ah). Status: Mutahhir (Menyucikan)."
    if 'tayamum' in query:
        return "🕌 [FIQIH] Tayamum menggunakan debu yang suci (Sa'id). Syarat: Tidak ada air atau udzur syar'i."
    return "🕌 [FIQIH] Menunggu kueri syariat spesifik."
