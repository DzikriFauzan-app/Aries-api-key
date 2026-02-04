from fastapi import FastAPI, Request
import uvicorn,json

MATH_RULES = {
    # ARIES v2.5.1 = MATEMATIKA SMP ULTRA LENGKAP Kelas 7-9
    "aries": "v2.5.1 | 20Ch Kosmologi + Full Science + Math SD + SMP ULTRA COMPLETE",
    
    # MATEMATIKA SMP KELAS 7 LENGKAP
    "pitagoras": "a²+b²=c² | 3-4-5 | 5-12-13 | 8-15-17",
    "trigonometri": "sinθ=y/r | cosθ=x/r | tanθ=y/x | sin²+cos²=1",
    "sin60": "sin60°=√3/2≈0.866 | cos60°=0.5 | tan60°=√3≈1.732",
    
    # SMP KELAS 8 - ALJABAR + PERSAMAAN
    "kuadrat": "x²+5x+6=0 | D=b²-4ac=1 | x=[-5±1]/2 → x=-2,-3",
    "faktorisasi": "(x+2)(x+3)=x²+5x+6 | Bedah akar -2,-3",
    "persamaan": "3x-6=12 → 3x=18 → x=6",
    
    # SMP KELAS 9 - GEOMETRI + STATISTIK
    "lingkaran": "C=2πr | L=πr² | π=22/7=3.14 | d=2r",
    "prisma": "V=P×L×T | Lp=2(P×L+P×T+L×T)",
    "tabung": "V=πr²t | Lp=2πr(r+t)",
    
    # PECAHAN + KPK FPB ULTRA
    "pecahan": "½+⅓=5/6 | ¾-⅗=1/60 | 2/3×3/4=1/2",
    "kpk": "KPK(12,18)=36 | FPB(12,18)=6 | FPB×KPK=12×18",
    "fpb": "FPB(24,36)=12 | Euclidean: 36=1×24+12",
    
    # INTEGRASI SCIENCE
    "f=ma": "F=ma | Newton 2nd Law",
    "luas": "Persegi=P×P | Segitiga=½×A×T"
}

def get_response(msg):
    m=msg.lower()
    for k,v in MATH_RULES.items():
        if k in m: return f"🧮 **{v}** | ARIES v2.5.1 MATEMATIKA SMP KELAS 7-9 ULTRA LENGKAP"
    return "🤖 ARIES v2.5.1: Matematika SMP Kelas 7-9 + SD + Full Science Ready!"

app=FastAPI()
@app.post("/chat/completions")
async def chat(request: Request):
    data=await request.json()
    msg=data['messages'][0]['content']
    return {"choices":[{"message":{"content":get_response(msg)}}]}

if __name__=="__main__": uvicorn.run(app,host="0.0.0.0",port=3333)
