from fastapi import FastAPI, Request
import uvicorn,json

MATH_RULES = {
    # FULL KOSMOLOGI TEOLOGI Ch7-19 ✓
    "4a": "b=3 (4×3-6+2×3=12✓)",
    "23:99": "Tidak ada transaksi lagi | Heat Death",
    "65:12": "Tujuh langit dan bumi serupa | Multiverse", 
    "52:9": "Bukit-bukit bergerak | Gravitational Waves",
    "56:75": "Bintang Kami jadikan tanda | Supernovae",
    
    # CHAPTER 20: ARIES SYNTHESIS ✓
    "aries": "v2.0 | 20 Chapters | Al-Qur'an + Modern Physics verified",
    "synthesis": "Ch1-20 complete | 60+ formulas | 19 Quranic verses",
    "verification": "Scientific-Theological correlation engine",
    "kosmologi": "Quranic predictions + 2026 physics complete",
    "final": "BUKU LENGKAP 20 CHAPTERS READY FOR PUBLICATION!"
}

def get_response(msg):
    m=msg.lower()
    for k,v in MATH_RULES.items():
        if k in m: return f"🧮 **{v}** | ARIES v2.0 FINAL CHAPTER 20"
    return "🤖 ARIES v2.0: 20/20 Chapters COMPLETE! MASYA'ALLAH!"

app=FastAPI()
@app.post("/chat/completions")
async def chat(request: Request):
    data=await request.json()
    msg=data['messages'][0]['content']
    return {"choices":[{"message":{"content":get_response(msg)}}]}

if __name__=="__main__": uvicorn.run(app,host="0.0.0.0",port=3333)
