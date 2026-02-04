from fastapi import FastAPI, Request
import uvicorn,json

MATH_RULES = {
    # KOSMOLOGI + QUANTUM (Ch7-11)
    "4a": "b=3 (4×3-6+2×3=12✓)",
    "gravitasi": "F=Gm1m2/r² + QS 22:65", 
    "gunung": "QS 27:88 + 2-10cm/tahun",
    "24:40": "7 lapis kegelapan + Internal Waves 200m",
    "schrodinger": "iℏ∂ψ/∂t=Ĥψ | Quantum 1926",
    
    # CHAPTER 12: CHAOS THEORY ✓
    "chaos": "dx/dt=σ(y-x), dy/dt=ρx-y-xz, dz/dt=xy-βz | Lorenz 1963",
    "lorenz": "Attractor σ=10,r=28,b=8/3 | Butterfly Effect",
    "butterfly": "Small change → Large effect | Chaos Theory",
    "fractal": "Self-similar patterns | Mandelbrot z²+c",
    "21:30": "Kami jadikan segala sesuatu berpasangan | Chaos Order"
}

def get_response(msg):
    m=msg.lower()
    for k,v in MATH_RULES.items():
        if k in m: return f"🧮 **{v}** | ARIES v1.4 Ch12 Chaos"
    return "🤖 ARIES: 12 Chapters ready!"

app=FastAPI()
@app.post("/chat/completions")
async def chat(request: Request):
    data=await request.json()
    msg=data['messages'][0]['content']
    return {"choices":[{"message":{"content":get_response(msg)}}]}

if __name__=="__main__": uvicorn.run(app,host="0.0.0.0",port=3333)
