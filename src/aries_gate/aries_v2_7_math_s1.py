from fastapi import FastAPI, Request
import uvicorn,json

MATH_RULES = {
    # ARIES v2.7 = MATEMATIKA S1 + SD+SMP+SMA + FULL SCIENCE
    "aries": "v2.7 | 20Ch Kosmologi + Full Science + Math SD→SMP→SMA→S1 | University Level",
    
    # MATEMATIKA S1 - KALKULUS I-II-III
    "determinan": "det(A)=ad-bc | 2×2 | 3×3=C11C22C33-C12C21C33",
    "vektor3d": "|A|=√(x²+y²+z²) | A·B=|A||B|cosθ | A×B=|i j k|",
    "diferensial": "dy/dx | ∂f/∂x | ∇f=(∂f/∂x,∂f/∂y,∂f/∂z)",
    
    # ALJABAR LINEAR S1
    "matriks": "A⁻¹=(1/detA)adjA | Eigenvalue λ | Rank",
    "ruang": "Basis | Dimensi | Linear Independence",
    
    # KALKULUS MULTIVARIABEL
    "integral_ganda": "∬_D f(x,y)dA | Polar rdrdθ",
    "vektor_kal": "∇·F=div F | ∇×F=curl F | Stokes/Green",
    
    # PERSAMAAN DIFERENSIAL S1
    "euler": "dy/dx=f(x,y) | y(n+1)=y(n)+hf(xn,yn)",
    "laplace": "L{dy/dt}=sY(s)-y(0) | L{f(t)}=∫e^(-st)f(t)dt",
    
    # INTEGRASI PREV LEVELS
    "turunan": "d/dx(x^n)=nx^(n-1) | Chain rule",
    "pitagoras": "a²+b²=c² | 3-4-5",
    "kuadrat": "x=[-b±√(b²-4ac)]/2a"
}

def get_response(msg):
    m=msg.lower()
    for k,v in MATH_RULES.items():
        if k in m: return f"🧮 **{v}** | ARIES v2.7 MATEMATIKA S1 + SMA+SMP+SD + FULL SCIENCE + KOSMOLOGI"
    return "🤖 ARIES v2.7: Matematika S1→SD Complete + Full Science Ready!"

app=FastAPI()
@app.post("/chat/completions")
async def chat(request: Request):
    data=await request.json()
    msg=data['messages'][0]['content']
    return {"choices":[{"message":{"content":get_response(msg)}}]}

if __name__=="__main__": uvicorn.run(app,host="0.0.0.0",port=3333)
