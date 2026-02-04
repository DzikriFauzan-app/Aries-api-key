from fastapi import FastAPI, Request
import uvicorn,json

MATH_RULES = {
    # KOSMOLOGI + ENTROPY (Ch7-18) ✓
    "4a": "b=3 (4×3-6+2×3=12✓)",
    "23:99": "Tidak ada transaksi lagi | 2nd Law S≥0 | Heat Death",
    "52:9": "Bukit-bukit bergerak | GW150914 LIGO 2015",
    "56:75": "Bintang Kami jadikan tanda | Type Ia Supernovae",
    
    # CHAPTER 19: MULTIVERSE ✓
    "65:12": "Tujuh langit dan bumi yang serupa | Multiverse String Theory",
    "multiverse": "10/11 dimensions | String Theory M-theory",
    "stringtheory": "10D/11D | 10^500 vacua | Landscape multiverse",
    "manyworlds": "Everett interpretation | Quantum parallel universes",
    "bubble": "Eternal inflation | Bubble universes | Different physics"
}

def get_response(msg):
    m=msg.lower()
    for k,v in MATH_RULES.items():
        if k in m: return f"🧮 **{v}** | ARIES v1.11 Ch19 Multiverse"
    return "🤖 ARIES: 19 Chapters + String Theory ready!"

app=FastAPI()
@app.post("/chat/completions")
async def chat(request: Request):
    data=await request.json()
    msg=data['messages'][0]['content']
    return {"choices":[{"message":{"content":get_response(msg)}}]}

if __name__=="__main__": uvicorn.run(app,host="0.0.0.0",port=3333)
