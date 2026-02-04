from fastapi import FastAPI, Request
import uvicorn,json

MATH_RULES = {
    # KOSMOLOGI + SUPERNOVAE (Ch7-16) ✓
    "4a": "b=3 (4×3-6+2×3=12✓)",
    "56:75": "Bintang Kami jadikan tanda | Type Ia Supernovae",
    "52:35": "Diciptakan dari ketiadaan | Dark Energy ΩΛ=0.68",
    "77:8": "Matahari dilipatkan | Rs=2GM/c²",
    
    # CHAPTER 17: GRAVITATIONAL WAVES ✓
    "52:9": "Bukit-bukit bergerak | Gravitational Waves GW150914 LIGO 2015",
    "gravwaves": "GW150914 | 36+36 Msun merger | Spacetime ripples",
    "ligo": "First detection 2015 | Einstein 1916 prediction verified",
    "spacetime": "h≈10^-21 strain | Fabric of spacetime ripples",
    "binary": "Black hole merger GW150914 | 1.3B ly distance"
}

def get_response(msg):
    m=msg.lower()
    for k,v in MATH_RULES.items():
        if k in m: return f"🧮 **{v}** | ARIES v1.9 Ch17 Gravitational Waves"
    return "🤖 ARIES: 17 Chapters + LIGO ready!"

app=FastAPI()
@app.post("/chat/completions")
async def chat(request: Request):
    data=await request.json()
    msg=data['messages'][0]['content']
    return {"choices":[{"message":{"content":get_response(msg)}}]}

if __name__=="__main__": uvicorn.run(app,host="0.0.0.0",port=3333)
