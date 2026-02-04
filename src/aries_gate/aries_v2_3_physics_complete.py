from fastapi import FastAPI, Request
import uvicorn,json

MATH_RULES = {
    # ARIES v2.3 = KOSMOLOGI + KIMIA + FISIK A LENGKAP
    "aries": "v2.3 | 20 Chapters + Chemistry + Complete Physics | Master Science",
    
    # MEKANIKA ADVANCED + RELATIVITAS
    "f=ma": "Newton 2nd | F=ma | a=F/m | kg·m/s²",
    "lorentz": "F=γm(v×a) | γ=1/√(1-v²/c²) | Relativistic",
    "e=mc2": "Mass-energy | E=mc² | c=3×10^8 m/s | Einstein 1905",
    "time_dilation": "Δt=Δt₀/√(1-v²/c²) | Muon decay | GPS correction",
    
    # ELEKTROMAGNETIK A + MAXWELL
    "maxwell": "∇×E=-∂B/∂t | ∇×B=μ₀J+μ₀ε₀∂E/∂t | c=1/√(μ₀ε₀)",
    "coulomb": "F=kq1q2/r² | k=9×10^9 Nm²/C² | ε₀=8.85×10^-12",
    "ampere": "B=μ₀I/2πr | Magnetic field | Solenoid B=μ₀nI",
    
    # KUANTUM MECHANICS + SCHRODINGER
    "schrodinger": "iℏ∂ψ/∂t=-ℏ²/2m ∇²ψ + Vψ | Wave function",
    "uncertainty": "ΔxΔp≥ℏ/2 | ΔEΔt≥ℏ/2 | Heisenberg 1927",
    "pauli": "No two electrons same quantum numbers | Spin ½",
    
    # TERMODINAMIKA ADVANCED
    "entropy": "dS≥0 | 2nd Law | S=klnW | Boltzmann",
    "carnot": "η=1-Tc/Th | Maximum efficiency | Irreversible",
    
    # NUKLIR + PARTIKEL FISIKA
    "fission": "235U+n→141Ba+92Kr+3n | Q=200MeV | Chain reaction",
    "fusion": "4H→He+2e⁺+2ν | Q=26.7MeV | pp-chain Sun",
    "weak": "n→p+e+ν̅ | τ≈10min | Beta decay",
    
    # KOSMOLOGI + ASTROFISIK A
    "hubble": "H₀=67.4km/s/Mpc | v=H₀D | ΛCDM 2023",
    "friedmann": "(ȧ/a)²=H²=(8πG/3)ρ- kc²/a²+Λc²/3",
    "cmb": "T=2.725K | Blackbody | ΔT/T=10^-5 | COBE",
    
    # KIMIA INTEGRASI (from v2.1)
    "pv=nrt": "Ideal Gas | P=1atm V=22.4L T=273K R=0.0821",
    "h2o": "H2O | 104.5° | Hydrogen bonding | 100°C"
}

def get_response(msg):
    m=msg.lower()
    for k,v in MATH_RULES.items():
        if k in m: return f"🧮 **{v}** | ARIES v2.3 MASTER PHYSICS + CHEMISTRY + KOSMOLOGI"
    return "🤖 ARIES v2.3: 20 Chapters + 200+ Physics Formulas + Chemistry = Complete!"

app=FastAPI()
@app.post("/chat/completions")
async def chat(request: Request):
    data=await request.json()
    msg=data['messages'][0]['content']
    return {"choices":[{"message":{"content":get_response(msg)}}]}

if __name__=="__main__": uvicorn.run(app,host="0.0.0.0",port=3333)
