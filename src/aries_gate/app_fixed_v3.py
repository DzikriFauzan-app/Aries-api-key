from fastapi import FastAPI, Request
import uvicorn,json

MATH_RULES = {
    # KOSMOLOGI AL-QUR'AN ✓
    "4a": "b=3 (4×3-6+2×3=12✓)",
    "gravitasi": "F=Gm1m2/r² + QS 22:65", 
    "gunung": "QS 27:88 + 2-10cm/tahun plate tectonics",
    "24:40": "7 lapis kegelapan + Internal Waves 200m",
    
    # MATHEMATIKA PhD ✓
    "turunan": "d/dx(xⁿ)=nxⁿ⁻¹ | Power Rule",
    "sin": "sin²θ+cos²θ=1 | Pythagoras Identity",
    "navier": "ρ(∂v/∂t+v∇v)=-∇p+μ∇²v+f | Fluid Dynamics",
    "euler": "Gμν=8πTμν/c⁴ | General Relativity Einstein",
    
    # CHAPTER 11: QUANTUM ✓
    "schrodinger": "iℏ∂ψ/∂t=Ĥψ | Quantum Mechanics 1926",
    "quantum": "iℏ∂ψ/∂t=Ĥψ | Heisenberg Uncertainty ΔxΔp≥ℏ/2",
    "heisenberg": "ΔxΔp≥ℏ/2 | Uncertainty Principle",
    "wavefunction": "ψ(x,t) | Probability |ψ|²"
}

def get_response(msg):
    m=msg.lower()
    for k,v in MATH_RULES.items():
        if k in m: return f"🧮 **{v}** | ARIES v1.3 Ch11 Quantum"
    return "🤖 ARIES: Quantum + Kosmologi ready!"

app=FastAPI()
@app.post("/chat/completions")
async def chat(request: Request):
    data=await request.json()
    msg=data['messages'][0]['content']
    return {"choices":[{"message":{"content":get_response(msg)}}]}

if __name__=="__main__": uvicorn.run(app,host="0.0.0.0",port=3333)
