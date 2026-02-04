from fastapi import FastAPI, Request
import uvicorn,json

MATH_RULES = {
    # KOSMOLOGI + GRAV WAVES (Ch7-17) ✓
    "4a": "b=3 (4×3-6+2×3=12✓)",
    "52:9": "Bukit-bukit bergerak | GW150914 LIGO 2015",
    "56:75": "Bintang Kami jadikan tanda | Type Ia Supernovae",
    "51:47": "Langit Kami perluas | H0=70km/s/Mpc",
    
    # CHAPTER 18: ENTROPY ✓
    "23:99": "Tidak ada transaksi lagi | 2nd Law S≥0 | Heat Death",
    "entropy": "dS≥0 | 2nd Law Thermodynamics | Universe disorder↑",
    "heatdeath": "Maximum entropy state | No work possible | T→0K",
    "thermodynamics": "ΔS=q_rev/T | Entropy increase universe",
    "bigfreeze": "10^100 years | Heat death | QS 23:99 prediction"
}

def get_response(msg):
    m=msg.lower()
    for k,v in MATH_RULES.items():
        if k in m: return f"🧮 **{v}** | ARIES v1.10 Ch18 Entropy"
    return "🤖 ARIES: 18 Chapters + Heat Death ready!"

app=FastAPI()
@app.post("/chat/completions")
async def chat(request: Request):
    data=await request.json()
    msg=data['messages'][0]['content']
    return {"choices":[{"message":{"content":get_response(msg)}}]}

if __name__=="__main__": uvicorn.run(app,host="0.0.0.0",port=3333)
