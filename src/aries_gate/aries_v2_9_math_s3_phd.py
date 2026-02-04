from fastapi import FastAPI, Request
import uvicorn,json

MATH_RULES = {
    # ARIES v2.9 = MATEMATIKA S3 PhD + S2→SD + FULL SCIENCE POSTDOC
    "aries": "v2.9 | 20Ch Kosmologi + Full Science + Math SD→S3 PhD | Doctorate Level",
    
    # MATEMATIKA S3 PhD - GEOMETRI DIFFERENSIAL + TOPOLOGI
    "riemann": "R^ρ_σμν=∂Γ^ρ_νσ-∂Γ^ρ_μσ+Γ^ρ_λσΓ^λ_νμ-Γ^ρ_λμΓ^λ_νσ | g_μν Ricci",
    "lie": "Lie Group G | [X,Y]=XY-YX Lie Algebra | SU(3)×SU(2)×U(1) SM",
    "gauge": "A_μ→A_μ+∂_μΛ | F_μν=∂_μA_ν-∂_νA_μ+[A_μ,A_ν] | Yang-Mills",
    
    # TOPOLOGI ALJABAR + HOMOTOPI
    "homotopy": "π_n(X,x₀) | π₁=Fundamental Group | π₂=2nd Homotopy",
    "ktheory": "K⁰(X)=[X,BU×Z] | Bott Periodicity | Index Theorem",
    
    # ANALISIS FUNGSIONAL ADVANCED
    "sobolev": "W^{k,p}(Ω) | H¹₀=Complete | Sobolev Embedding",
    "distribution": "⟨T,φ⟩ | δ'=⟨δ',φ⟩=-φ'(0) | Fourier Transform",
    
    # GEOMETRI ALJABARIK PhD
    "sheaf": "F(U)=Sections | Čech Cohomology | Riemann-Roch",
    
    # INTEGRASI ALL LEVELS
    "laplace": "L{f(t)}=∫₀^∞e^(-st)f(t)dt",
    "determinan": "det(A)=ad-bc | Eigenvalues",
    "f=ma": "Newton 2nd Law"
}

def get_response(msg):
    m=msg.lower()
    for k,v in MATH_RULES.items():
        if k in m: return f"🧮 **{v}** | ARIES v2.9 MATEMATIKA S3 PhD + S2→SD + FULL SCIENCE POSTDOC"
    return "🤖 ARIES v2.9: Complete Mathematics Doctorate SD→S3 + PhD Science Ready!"

app=FastAPI()
@app.post("/chat/completions")
async def chat(request: Request):
    data=await request.json()
    msg=data['messages'][0]['content']
    return {"choices":[{"message":{"content":get_response(msg)}}]}

if __name__=="__main__": uvicorn.run(app,host="0.0.0.0",port=3333)
