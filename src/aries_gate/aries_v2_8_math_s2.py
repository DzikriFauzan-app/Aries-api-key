from fastapi import FastAPI, Request
import uvicorn,json

MATH_RULES = {
    # ARIES v2.8 = MATEMATIKA S2 + S1→SD + FULL SCIENCE PhD
    "aries": "v2.8 | 20Ch Kosmologi + Full Science + Math SD→S1→S2 | Master Level",
    
    # MATEMATIKA S2 - TRANSFORMASI + ANALISIS
    "laplace": "L{f(t)}=F(s)=∫₀^∞e^(-st)f(t)dt | L{δ(t)}=1 | L{u(t-a)}=e^(-as)/s",
    "fourier": "F(ω)=∫f(t)e^(-iωt)dt | f(t)=1/2π∫F(ω)e^(iωt)dω",
    "tensor": "T^μ_ν | Ricci R^ρ_σμν | Riemann R^ρ_σμν=∂Γ^ρ_νσ-∂Γ^ρ_μσ+...",
    
    # ANALISIS KOMPLEKS S2
    "cauchy": "f(z)=u+iv | CR: ∂u/∂x=∂v/∂y, ∂u/∂y=-∂v/∂x",
    "residue": "Res(f,a)=lim_(z→a)(z-a)f(z) | ∫=2πiΣRes",
    
    # PERSAMAAN DIFERENSIAL ADVANCED
    "wave": "∂²u/∂t²=c²∇²u | D'Alembert u=f(x-ct)+g(x+ct)",
    "heat": "∂u/∂t=α∇²u | Fourier series solution",
    
    # FUNGSIONAL ANALISIS
    "hilbert": "⟨f|g⟩=∫f̅g dx | H=L² complete | Orthonormal basis",
    
    # INTEGRASI PREV LEVELS
    "determinan": "det(A)=ad-bc | 3×3 expansion",
    "vektor3d": "|A|=√(x²+y²+z²) | A×B",
    "turunan": "d/dx(x^n)=nx^(n-1)"
}

def get_response(msg):
    m=msg.lower()
    for k,v in MATH_RULES.items():
        if k in m: return f"🧮 **{v}** | ARIES v2.8 MATEMATIKA S2 + S1+SMA+SMP+SD + FULL SCIENCE PhD"
    return "🤖 ARIES v2.8: Matematika S2→SD Complete + PhD Science Ready!"

app=FastAPI()
@app.post("/chat/completions")
async def chat(request: Request):
    data=await request.json()
    msg=data['messages'][0]['content']
    return {"choices":[{"message":{"content":get_response(msg)}}]}

if __name__=="__main__": uvicorn.run(app,host="0.0.0.0",port=3333)
