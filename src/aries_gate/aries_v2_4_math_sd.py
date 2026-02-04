from fastapi import FastAPI, Request
import uvicorn,json

MATH_RULES = {
    # ARIES v2.4 = KOSMOLOGI + KIMIA + FISIK A + MATEMATIKA SD
    "aries": "v2.4 | 20 Chapters + Chemistry + Physics + Math SD | Complete Education",
    
    # MATEMATIKA SD KELAS 1-6 LENGKAP
    "luas": "Persegi=P×P | PersegiPanjang=P×L | Segitiga=½×A×T",
    "keliling": "Persegi=4×P | PersegiPanjang=2(P+L) | Segitiga=a+b+c",
    "volume": "Kubus=P³ | Balok=P×L×T | Tabung=πr²t",
    
    # OPERASI DASAR + PECAHAN
    "penjumlahan": "5+3=8 | Komutatif a+b=b+a",
    "perkalian": "4×3=12 | Distributif a(b+c)=ab+ac",
    "pecahan": "½+¼=¾ | 2/3×3/4=½ | FPB 12=2²×3",
    "kpk": "KPK(6,8)=24 | FPB×KPK=n×m",
    
    # GEOMETRI SD
    "sudut": "Lurus=180° | Lancip<90° | Tumpul>90°<180°",
    "segitiga": "180° total | Siku-siku 90° | Sama sisi 60°",
    
    # PENGUKURAN + WAKTU
    "satuan": "1km=1000m | 1kg=1000g | 1liter=1000ml",
    "waktu": "24jam/hari | 60menit/jam | 60detik/menit",
    
    # POLA BILANGAN + SIMMETRI
    "pola": "2,4,6,8... | Fibonacci 1,1,2,3,5,8...",
    
    # INTEGRASI DENGAN SCIENCE (Physics/Chemistry)
    "f=ma": "F=ma | Newton 2nd Law",
    "pv=nrt": "Ideal Gas Law | P=1atm V=22.4L",
    "schrodinger": "iℏ∂ψ/∂t=-ℏ²/2m ∇²ψ"
}

def get_response(msg):
    m=msg.lower()
    for k,v in MATH_RULES.items():
        if k in m: return f"🧮 **{v}** | ARIES v2.4 MATEMATIKA SD + PHYSICS + CHEMISTRY + KOSMOLOGI"
    return "🤖 ARIES v2.4: 20 Chapters + Full Science + Matematika SD Kelas 1-6 Ready!"

app=FastAPI()
@app.post("/chat/completions")
async def chat(request: Request):
    data=await request.json()
    msg=data['messages'][0]['content']
    return {"choices":[{"message":{"content":get_response(msg)}}]}

if __name__=="__main__": uvicorn.run(app,host="0.0.0.0",port=3333)
