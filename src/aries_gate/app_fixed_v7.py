from fastapi import FastAPI, Request
import uvicorn,json

MATH_RULES = {
    # KOSMOLOGI + BLACK HOLES (Ch7-14) ✓
    "4a": "b=3 (4×3-6+2×3=12✓)",
    "51:47": "Langit Kami perluas | H0=70km/s/Mpc",
    "77:8": "Matahari dilipatkan | Rs=2GM/c²",
    "schwarzschild": "Rs=2GM/c² | Sun=3km radius",
    "chaos": "dx/dt=σ(y-x), dy/dt=ρx-y-xz, dz/dt=xy-βz",
    
    # CHAPTER 15: DARK ENERGY ✓
    "52:35": "Diciptakan dari ketiadaan | Dark Energy ΩΛ=0.68",
    "darkenergy": "ΩΛ=0.68 | 68% universe | Accelerated expansion ä/a>0",
    "lambda": "ΛCDM model | Cosmological constant | Vacuum energy",
    "wcdm": "w≈-1 | Equation of state | Repulsive gravity",
    "vacuum": "Quantum vacuum energy | Heisenberg uncertainty → Λ"
}

def get_response(msg):
    m=msg.lower()
    for k,v in MATH_RULES.items():
        if k in m: return f"🧮 **{v}** | ARIES v1.7 Ch15 Dark Energy"
    return "🤖 ARIES: 15 Chapters + Dark Energy ready!"

app=FastAPI()
@app.post("/chat/completions")
async def chat(request: Request):
    data=await request.json()
    msg=data['messages'][0]['content']
    return {"choices":[{"message":{"content":get_response(msg)}}]}

if __name__=="__main__": uvicorn.run(app,host="0.0.0.0",port=3333)
