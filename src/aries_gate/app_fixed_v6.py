from fastapi import FastAPI, Request
import uvicorn,json

MATH_RULES = {
    # KOSMOLOGI + UNIVERSE (Ch7-13) ✓
    "4a": "b=3 (4×3-6+2×3=12✓)",
    "gravitasi": "F=Gm1m2/r² + QS 22:65", 
    "51:47": "Langit Kami perluas | H0=70km/s/Mpc",
    "hubble": "v=H₀d | Big Bang 13.8B years",
    "chaos": "dx/dt=σ(y-x), dy/dt=ρx-y-xz, dz/dt=xy-βz",
    
    # CHAPTER 14: BLACK HOLES ✓
    "77:8": "Matahari dilipatkan | Schwarzschild Rs=2GM/c²",
    "blackhole": "Rs=2GM/c² | Event Horizon | Spacetime curvature",
    "schwarzschild": "Rs=2GM/c² | Black hole radius Sun=3km",
    "hawking": "T=ℏc³/(8πGMk) | Hawking radiation black hole evaporation",
    "eventhorizon": "No escape velocity > c | Information paradox"
}

def get_response(msg):
    m=msg.lower()
    for k,v in MATH_RULES.items():
        if k in m: return f"🧮 **{v}** | ARIES v1.6 Ch14 Black Holes"
    return "🤖 ARIES: 14 Chapters + Black Holes ready!"

app=FastAPI()
@app.post("/chat/completions")
async def chat(request: Request):
    data=await request.json()
    msg=data['messages'][0]['content']
    return {"choices":[{"message":{"content":get_response(msg)}}]}

if __name__=="__main__": uvicorn.run(app,host="0.0.0.0",port=3333)
