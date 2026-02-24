def get_response(msg):
    m = msg.lower()
    data = {
        "termodinamika 1": "Hukum 1: ΔU = Q - W (Energi tidak dapat diciptakan/dimusnahkan, hanya berubah bentuk).",
        "termodinamika 2": "Hukum 2: Entropi total sistem terisolasi selalu meningkat (Efisiensi mesin < 100%).",
        "entropi": "Entropi (S) adalah ukuran ketidakteraturan sistem. dS = dQ/T.",
        "karnot": "Siklus Carnot: η = 1 - (Tc/Th). Efisiensi termodinamika maksimum."
    }
    for k, v in data.items():
        if k in m: return f"🔥 {v}"
    return "🍎 ARIES Physics Complete: Ready for Thermodynamic & Quantum Queries."
