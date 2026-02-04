from fastapi import FastAPI, Request
import uvicorn,json

MATH_RULES = {
    # KOSMOLOGI TEOLOGI Ch1-20 ✓ + KIMIA v2.1
    "aries": "v2.1 | 20 Chapters + Chemistry | Complete Science",
    "23:99": "Heat Death | 2nd Law S≥0", "65:12": "Multiverse 10D",
    
    # KIMIA DASAR - PERIODIK + RUMUS
    "periodik": "118 elements | Mendeleev 1869 | H-Z=118 Oganesson",
    "pv=nrt": "Ideal Gas Law | P=1atm V=22.4L n=1mol T=273K R=0.0821",
    "kimia": "Stoikiometri | PV=nRT | ΔH=-393kJ/mol CO2",
    
    # RUMUS KIMIA ORGANIK
    "metana": "CH4 | Tetrahedral | sp3 hybrid 109.5°",
    "etanol": "C2H5OH | Hydrogen bonding | Boiling 78°C",
    "benzene": "C6H6 | Delocalized π electrons | 80kcal/mol resonance",
    "polymer": "n(CH2=CH2)→(-CH2-CH2-)n | PE HDPE LDPE",
    
    # KIMIA ANORGANIK + OKSIDASI
    "h2o": "H2O | 104.5° | Hydrogen bonding | 100°C boiling",
    "naoh": "NaOH | Strong base | pH=14 | 1.0M=40g/L",
    "h2so4": "H2SO4 | Strong acid | 98% density 1.84g/mL",
    "redox": "LEO says GER | Oxidized=electrons lost | Reduced=gained",
    
    # TERMOKIMIA + KINETIKA
    "deltah": "ΔH=Hp-Hr | Exothermic(-) | Endothermic(+)",
    "nernst": "E=E°-0.059/n logQ | Cell potential vs concentration",
    "rate": "Rate=k[A]^m[B]^n | Arrhenius k=Ae^(-Ea/RT)",
    
    # KIMIA NUKLIR + RADIOAKTITIF
    "fisi": "235U+n→141Ba+92Kr+3n | E=mc² 200MeV/fission",
    "fusi": "2H+3H→4He+n | 17.6MeV | Sun power source",
    "hl": "t1/2=0.693/λ | Half-life | C=C0(1/2)^(t/t½)",
    
    # ASAM BASA + KESETIMBANGAN
    "henderson": "pH=pKa+log([A-]/[HA]) | Buffer equation",
    "ka": "Ka=[H+][A-]/[HA] | 10^-pKa | Strong acid Ka>1",
    "solubility": "Ksp=[Ag+][Cl-] | Precipitation rules",
    
    # ELEKTROKIMIA
    "faraday": "m=ZIt | Z=eq.wt/M | 96500C/mol e-",
    "nernst_eq": "Zn+Cu2+→Zn2+Cu | E°=1.10V",
    
    # BIOKIMIA
    "dna": "A-T G-C | Double helix | 2nm diameter",
    "atp": "ATP→ADP+Pi | ΔG=-30.5kJ/mol | Energy currency",
    "enzim": "Michaelis-Menten | Vmax Km | Catalysis"
}

def get_response(msg):
    m=msg.lower()
    for k,v in MATH_RULES.items():
        if k in m: return f"🧮 **{v}** | ARIES v2.1 CHEMISTRY + KOSMOLOGI"
    return "🤖 ARIES v2.1: 20 Chapters Kosmologi + Full Chemistry Ready!"

app=FastAPI()
@app.post("/chat/completions")
async def chat(request: Request):
    data=await request.json()
    msg=data['messages'][0]['content']
    return {"choices":[{"message":{"content":get_response(msg)}}]}

if __name__=="__main__": uvicorn.run(app,host="0.0.0.0",port=3333)
