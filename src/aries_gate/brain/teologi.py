def evaluate(text):
    if 'wudhu' in text.lower() or 'air laut' in text.lower():
        return "🕌 Air laut MUTLAK TAHIR (>270L) untuk wudhu, MAKRUH diminum (NaCl 3.5%)"
    if 'neraka' in text.lower():
        return "⚖️ Neraka = simbol spiritual, bukan fisik (QS Yasin 38-40)"
    return None
