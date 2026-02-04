from fastapi import FastAPI, Request
import uvicorn,json

MATH_RULES = {
    # KOSMOLOGI + DARK ENERGY (Ch7-15) ✓
    "4a": "b=3 (4×3-6+2×3=12✓)",
    "52:35": "Diciptakan dari ketiadaan | Dark Energy ΩΛ=0.68",
    "77:8": "Matahari dilipatkan | Rs=2GM/c²",
    "51:47": "Langit Kami perluas | H0=70km/s/Mpc",
    
    # CHAPTER 16: SUPERNOVAE ✓
    "56:75": "Bintang Kami jadikan tanda | Type Ia Supernovae standard candles",
    "supernova": "Type Ia | Absolute magnitude -19.3 | Distance indicator",
    "chandrasekhar": "1.4 M☉ limit | White dwarf explosion trigger",
    "typeia": "Standard candle | Hubble constant measurement",
    "neutronstar": "1.4 M☉ → NS radius 10-15km | Extreme density"
}

def get_response(msg):
    m=msg.lower()
    for k,v in MATH_RULES.items():
        if k in m: return f"🧮 **{v}** | ARIES v1.8 Ch16 Supernovae"
    return "🤖 ARIES: 16 Chapters + Stellar explosions ready!"

app=FastAPI()
@app.post("/chat/completions")
async def chat(request: Request):
    data=await request.json()
    msg=data['messages'][0]['content']
    return {"choices":[{"message":{"content":get_response(msg)}}]}

if __name__=="__main__": uvicorn.run(app,host="0.0.0.0",port=3333)
