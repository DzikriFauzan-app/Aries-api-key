from fastapi import FastAPI, Request
import uvicorn,json

MATH_RULES = {
    # KOSMOLOGI + CHAOS (Ch7-12) ✓
    "4a": "b=3 (4×3-6+2×3=12✓)",
    "gravitasi": "F=Gm1m2/r² + QS 22:65", 
    "gunung": "QS 27:88 + 2-10cm/tahun",
    "24:40": "7 lapis kegelapan + Internal Waves 200m",
    "chaos": "dx/dt=σ(y-x), dy/dt=ρx-y-xz, dz/dt=xy-βz",
    "schrodinger": "iℏ∂ψ/∂t=Ĥψ | Quantum",
    
    # CHAPTER 13: COSMIC EXPANSION ✓
    "51:47": "Langit Kami perluas | Universe Expansion H0=70km/s/Mpc",
    "hubble": "v=H₀d | H₀=70km/s/Mpc | Big Bang 13.8B years",
    "cmb": "Cosmic Microwave Background T=2.725K | Big Bang echo",
    "bigbang": "Universe age 13.8B years | QS 51:47 expansion",
    "redshift": "z=Δλ/λ | Galaxy recession velocity"
}

def get_response(msg):
    m=msg.lower()
    for k,v in MATH_RULES.items():
        if k in m: return f"🧮 **{v}** | ARIES v1.5 Ch13 Universe"
    return "🤖 ARIES: 13 Chapters + Big Bang ready!"

app=FastAPI()
@app.post("/chat/completions")
async def chat(request: Request):
    data=await request.json()
    msg=data['messages'][0]['content']
    return {"choices":[{"message":{"content":get_response(msg)}}]}

if __name__=="__main__": uvicorn.run(app,host="0.0.0.0",port=3333)
