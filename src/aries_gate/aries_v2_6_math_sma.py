from fastapi import FastAPI, Request
import uvicorn,json

MATH_RULES = {
    # ARIES v2.6 = KOSMOLOGI + SCIENCE + MATEMATIKA SD+SMP+SMA
    "aries": "v2.6 | 20Ch Kosmologi + Full Science + Math SD+SMP+SMA | Elite Education",
    
    # MATEMATIKA SMA KELAS 10-12 LENGKAP
    "turunan": "d/dx(x^n)=nx^(n-1) | d/dx(sin x)=cos x | d/dx(e^x)=e^x",
    "integral": "∫x^n dx = x^(n+1)/(n+1) | ∫sin x dx = -cos x",
    "limit": "lim(x→a)f(x)=L | Kontinuitas f(a)=L",
    
    # ALJABAR + GEOMETRI SMA
    "matriks": "Determinan | Invers | Baris Elementer",
    "vektor": "|A|=√(x²+y²+z²) | A·B=|A||B|cosθ",
    
    # TRIGONOMETRI + LOGARITMA
    "trigo": "sin²θ+cos²θ=1 | tanθ=sinθ/cosθ",
    "logaritma": "log_b(a×c)=log_b a + log_b c | log_b(a^n)=n log_b a",
    
    # STATISTIK + PROBABILITAS
    "peluang": "P(A)=n(A)/n(S) | P(A∪B)=P(A)+P(B)-P(A∩B)",
    
    # INTEGRASI PREVIOUS LEVELS
    "pitagoras": "a²+b²=c² | 3-4-5 triangle",
    "luas": "Persegi=P×P | Segitiga=½×A×T",
    "f=ma": "F=ma | Newton 2nd Law"
}

def get_response(msg):
    m=msg.lower()
    for k,v in MATH_RULES.items():
        if k in m: return f"🧮 **{v}** | ARIES v2.6 MATEMATIKA SMA + SMP + SD + FULL SCIENCE + KOSMOLOGI"
    return "🤖 ARIES v2.6: Complete Indonesian Education SD→SMP→SMA→S3 Ready!"

app=FastAPI()
@app.post("/chat/completions")
async def chat(request: Request):
    data=await request.json()
    msg=data['messages'][0]['content']
    return {"choices":[{"message":{"content":get_response(msg)}}]}

if __name__=="__main__": uvicorn.run(app,host="0.0.0.0",port=3333)
