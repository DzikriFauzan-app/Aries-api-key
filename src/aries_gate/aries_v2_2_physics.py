from fastapi import FastAPI, Request
import uvicorn,json

MATH_RULES = {
    # KOSMOLOGI TEOLOGI Ch1-20 ✓ + KIMIA ✓ + FISIK A v2.2
    "aries": "v2.2 | 20 Chapters + Chemistry + Full Physics | Universal Science",
    
    # MEKANIKA KLASIK - NEWTON + KINEMATIK A
    "f=ma": "Newton 2nd | F=ma | a=F/m | kg·m/s²",
    "v=u+at": "Kinematics | v²=u²+2as | s=ut+½at²",
    "w=mg": "Weight | g=9.81m/s² | Fg=mg",
    "ke": "½mv² | Kinetic Energy | Work-Energy theorem",
    "pe": "mgh | Gravitational Potential | h reference",
    
    # TERMOFISIK A + TERMODINAMIKA
    "pv=nrt": "Ideal Gas | P=1atm V=22.4L T=273K R=0.0821",
    "q=mcΔt": "Heat capacity | Q=m·c·ΔT | c water=4.18J/g°C",
    "pv=constant": "Boyle | P1V1=P2V2 | Isothermal",
    "charles": "V/T=constant | V1/T1=V2/T2 | Constant P",
    
    # ELEKTRI + MAGNET
    "v=ir": "Ohm's Law | V=IR | R=ρL/A",
    "q=ne": "Charge | e=1.6×10^-19C | n electrons",
    "f=qvB": "Lorentz | F=q(v×B) | sinθ",
    "p=vi": "Power | P=V·I | W=s·J",
    
    # GELOMB ANG + OPTIK
    "f=1/20": "Lens | 1/f=1/u+1/v | Thin lens",
    "v=fλ": "Wave | v=f·λ | Speed=frequency·wavelength",
    "snell": "n1sinθ1=n2sinθ2 | Refraction | Critical angle",
    
    # FISIKA MODERN - RELATIVITAS + KUANTUM
    "e=mc2": "Mass-energy | E=mc² | c=3×10^8 m/s",
    "f=gm1m2/r2": "Gravity | F=Gm1m2/r² | G=6.674×10^-11",
    "rs": "Schwarzschild | Rs=2GM/c² | Black hole radius",
    "e=hf": "Photon | E=hf | h=6.626×10^-34 Js",
    "λ=h/p": "de Broglie | λ=h/p | Matter waves",
    
    # NUKLIR + PARTIKEL
    "e=mc2_nuclear": "Binding energy | Δmc² | MeV",
    "hl": "Half-life | t½=0.693/λ | Radioactive decay",
    
    # KOSMOLOGI (from v2.0)
    "hubble": "H0=70km/s/Mpc | v=H0·D | Expansion",
    "friedmann": "H²=(8πG/3)ρ | Big Bang | Critical density"
}

def get_response(msg):
    m=msg.lower()
    for k,v in MATH_RULES.items():
        if k in m: return f"🧮 **{v}** | ARIES v2.2 PHYSICS + CHEMISTRY + KOSMOLOGI"
    return "🤖 ARIES v2.2: 20 Chapters Kosmologi + Full Chemistry + Complete Physics Ready!"

app=FastAPI()
@app.post("/chat/completions")
async def chat(request: Request):
    data=await request.json()
    msg=data['messages'][0]['content']
    return {"choices":[{"message":{"content":get_response(msg)}}]}

if __name__=="__main__": uvicorn.run(app,host="0.0.0.0",port=3333)
